const { Contact, addSchema, updateFavoriteSchema } = require('./Contact');
const schemas = require('./User');
const User = require('./User');
module.exports = { Contact, schemas, User, addSchema, updateFavoriteSchema };
