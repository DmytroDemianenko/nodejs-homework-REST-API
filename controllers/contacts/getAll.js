const { Contact } = require('../../models/contact');
async function getAll(res, req) {
  const result = await Contact.find({});
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
}
module.exports = getAll;
