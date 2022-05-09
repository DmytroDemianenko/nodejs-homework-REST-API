const express = require('express');
const router = express.Router();
const { isValidObjectId } = require("mongoose");
// const { ctrlWrapper } = require('../../middlewares');
const Joi = require('joi');
// const contactControls = require('../../controllers');
// const { contacts: ctrl } = require('../../controllers/contacts');
const Contact = require('../../models/contact');
// const { validation } = require('../../middlewares');
const { createError } = require('../../helpers');

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.number().required(),
});
router.get('/', async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
    } catch (error) {
    next(error);
  }
});
router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const isValid = isValidObjectId(contactId);
    if (!isValid) {
      throw createError(404);
    }
    const result = await Contact.findById(contactId);
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});
module.exports = router;

// const contacts = require('../../models/contacts');




// router.delete('/:contactId', async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contacts.removeContact(contactId);
//     if (!result) {
//       throw createError(404);
//     }
//     res.json({ message: 'contact deleted' });
//   } catch (error) {
//     next(error);
//   }
// });

// router.put('/:contactId', async (req, res, next) => {
//   try {
//     const { error } = contactSchema.validate(req.body);
//     if (error) {
//       throw createError(400, error.message);
//     }
//     const { contactId } = req.params;
//     const changedContact = await contacts.updateContact({
//       id: contactId,
//       changedContact: req.body,
//     });
//     if (!changedContact) {
//       const error = new Error('Not found');
//       error.status = 404;
//     }
//     res.json({
//       status: '200',
//       data: {
//         changedContact,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// });
