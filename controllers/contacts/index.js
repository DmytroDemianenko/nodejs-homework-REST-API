const getAll = require('./getAll');
const getContactById = require('./getContactById');
const addContacts = require('./addContacts');
const removeContact = require('./removeContact');
const updateContacts = require('./updateContacts');
const updateStatus = require('./updateStatus');
module.exports = {
  getAll,
  getContactById,
  addContacts,
  removeContact,
  updateContacts,
  updateStatus,
};
