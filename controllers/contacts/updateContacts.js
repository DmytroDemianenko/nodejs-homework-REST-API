const { createError } = require('../../helpers');
const { isValidObjectId } = require('mongoose');
const { Contact } = require('../../models/contact');
const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const isValid = isValidObjectId(contactId);
  if (!isValid) {
    throw createError(404);
  }
  const changedContact = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!changedContact) {
    throw createError(404);
  }
  res.json(changedContact);
};
module.exports = updateContact;
