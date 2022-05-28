const { isValidObjectId } = require('mongoose');
const { createError } = require('../../helpers');
const { Contact } = require('../../models');
const getContactById = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const isValid = isValidObjectId(contactId);
  if (!isValid) {
    throw createError(404);
  }
  const result = await Contact.findOne({ _id: contactId, owner });
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};
module.exports = getContactById;
