const express = require('express');
const { User, schemas } = require('../../models/User');
const { createError, sendMail } = require('../../helpers');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { SECRET_KEY } = process.env;
const { auth, upload } = require('../../middlewares');
const gravatar = require('gravatar');
const path = require('path');
const fs = require('fs/promises');
const { nanoid } = require('nanoid');
const nodemailer = require('nodemailer');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'demianenkodmytro@meta.ua',
    pass: META_PASSWORD,
  },
};
const transporter = nodemailer.createTransport(nodemailerConfig);

router.post('/register', async (req, res, next) => {
  try {
    const { error } = schemas.register.validate(req.body);
    if (error) {
      throw createError(400, 'Email or password is invalid');
    }
    const { email, password } = req.body;
    const result = await User.findOne({ email });
    if (result) {
      throw createError(409, 'Email in use');
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();
    await User.create({
      email,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });
    const mail = {
      to: email,
      from: 'demianenkodmytro@meta.ua',
      subject: 'Confirm your email',
      html: `<a target="_blank"
      href="http:\\localhost:3000/api/auth/verify/
      ${verificationToken}>Press link</a>`,
    };
    await transporter.sendMail(mail);
    res.status(201).json({
      user: {
        email,
        subscription: 'starter',
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/verify/:verificationToken', async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
      throw createError(404);
    }
    await User.findByIdAndUpdate(user._id, {
      verificationToken: null,
      verify: true,
    });
    res.json({
      message: 'verification success',
    });
  } catch (error) {
    next(error);
  }
});

router.post('/verify', async (req, res, next) => {
  try {
    const { error } = schemas.verifyEmail.validate(req.body);
    const { email } = req.body;
    if (error) {
      throw createError(400, 'Email or password is invalid');
    }
    const user = User.findOne({ email });
    if (!user) {
      throw createError(401);
    }
    if (user.verify) {
      throw createError(400, 'Verification nas been already passed');
    }
    const mail = {
      to: email,
      subject: 'Confirm your email',
      html: `<a target="_blank"
      href="http:\\localhost:3000/api/auth/verify/
      ${user.verificationToken}>Press link</a>`,
    };
    await sendMail(mail);
    res.json({
      message: 'Verification email sent',
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { error } = schemas.login.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(401, 'Email or password is wrong');
    }
    if (!user.verify) {
      throw createError(401, 'Email not verify');
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw createError(401, 'Email or password is wrong');
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      token,
      user: {
        email,
        subscription: 'starter',
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/current', auth, async (req, res) => {
  const { email } = req.user;
  res.json({
    email,
  });
});
router.get('/logout', auth, async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(204).send();
  } catch (error) {}
});
router.patch(
  '/avatars',
  auth,
  upload.single('avatar'),
  async (req, res, next) => {
    try {
      const { originalname, path: tempUpload } = req.file;
      const resultUpload = path.join(avatarsDir, originalname);
      await fs.rename(tempUpload, resultUpload);
      const avatarURL = path.join('avatars', originalname);
      await User.findByIdAndUpdate(req.user._id, { avatarURL });
      res.json({
        avatarURL,
      });
    } catch (error) {
      await fs.unlink(req.file.path);
      next(error);
    }
  }
);
module.exports = router;
