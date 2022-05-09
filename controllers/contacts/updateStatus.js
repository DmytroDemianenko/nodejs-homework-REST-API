const { createError } = require('../../helpers');
const { isValidObjectId } = require('mongoose');
const { Contact } = require('../../models/contact');
const updateStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const isValid = isValidObjectId(contactId);
  if (!isValid) {
    throw createError(404);
  }
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};
module.exports = updateStatus;
