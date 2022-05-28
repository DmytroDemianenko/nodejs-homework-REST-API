const { createError } = require('../../helpers');
const { isValidObjectId } = require('mongoose');
const { Contact } = require('../../models');
const updateStatus = async (req, res) => {
  const { contactId } = req.params;
  const isValid = isValidObjectId(contactId);
  if (!isValid) {
    throw createError(404);
  }
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw createError(404);
  }
  res.json({
    status: '200',
    data: {
      result,
    },
  });
};
module.exports = updateStatus;
