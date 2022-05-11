const { createError } = require('../../helpers');
const { isValidObjectId } = require('mongoose');
const { Contact } = require('../../models/contact');
const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const isValid = isValidObjectId(contactId);
  if (!isValid) {
    throw createError(404);
  }
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw createError(404);
  }
  res.json({ message: 'contact deleted' });
};
module.exports = removeContact;
