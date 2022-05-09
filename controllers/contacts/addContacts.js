const { Contact } = require('../../models/contact');
async function addContacts(res, req) {
  const result = await Contact.create(req.body);
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  });
}
module.exports = addContacts;
