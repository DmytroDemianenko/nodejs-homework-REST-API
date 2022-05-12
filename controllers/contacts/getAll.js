const { Contact } = require('../../models/contact');
const getAll = async (req, res) => {
  const { _id } = req.user;

  const response = await Contact.find({ owner: _id }).populate('owner');
  res.json({
    status: 'success',
    code: 200,
    data: {
      response,
    },
  });
};
module.exports = getAll;