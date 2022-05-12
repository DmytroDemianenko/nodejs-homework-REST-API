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
  },
  { versionKey: false, timestamps: true }
);
const registerJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).required(),
  subscription: Joi.string(),
});
const schemas = {
  register: registerJoiSchema,
  login: registerJoiSchema,
};
const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
