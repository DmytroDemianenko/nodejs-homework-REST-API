const { isValidObjectId } = require('mongoose');
const { createError } = require('../../helpers');
const { Contact } = require('../../models/contact');
const getContactById = async (req, res, next) => {
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
};
module.exports = getContactById;
