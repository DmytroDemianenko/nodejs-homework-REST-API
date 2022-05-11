const { Contact } = require('../../models/contact');
const getAll = async (req, res) => {
  const response = await Contact.find({});
  res.json({
    status: 'success',
    code: 200,
    data: {
      response,
    },
  });
};
module.exports = getAll;