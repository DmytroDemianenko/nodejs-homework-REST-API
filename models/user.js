const { Schema, model } = require('mongoose');
const Joi = require('Joi');

const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unquire: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlenght: 8,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }
);
const registerJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).required(),
  subscription: Joi.string(),
});
const verifyEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});
const schemas = {
  register: registerJoiSchema,
  login: registerJoiSchema,
  verifyEmail: verifyEmailSchema,
};
const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
