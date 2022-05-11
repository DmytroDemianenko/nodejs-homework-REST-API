const express = require('express');
const router = express.Router();
const { ctrlWrapper } = require('../../middlewares');
const ctrl = require('../../controllers/contacts');
const { schemas } = require('../../models/contact');
const { validation } = require('../../middlewares');

router.get('/', ctrl.getAll);
router.get('/:contactId', ctrlWrapper(ctrl.getContactById));
router.post('/', validation(schemas.add), ctrlWrapper(ctrl.addContacts));
router.put(
  '/:contactId',
  validation(schemas.add),
  ctrlWrapper(ctrl.updateContacts)
);
router.delete('/:contactId', ctrlWrapper(ctrl.removeContact));
router.patch(
  '/:contactId/favorite',
  validation(schemas.favoriteSchema),
  ctrlWrapper(ctrl.updateStatus)
);

module.exports = router;

