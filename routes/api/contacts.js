const express = require('express');
const router = express.Router();
const { ctrlWrapper } = require('../../middlewares');
const ctrl = require('../../controllers/contacts');
const { schemas } = require('../../models/contact');
const { validation } = require('../../middlewares');
const { auth } = require('../../middlewares');

router.get('/', auth, ctrl.getAll);
router.get('/:contactId', auth, ctrlWrapper(ctrl.getContactById));
router.post('/', auth, validation(schemas.add), ctrlWrapper(ctrl.addContacts));
router.put(
  '/:contactId',
  auth,
  validation(schemas.add),
  ctrlWrapper(ctrl.updateContacts)
);
router.delete('/:contactId', auth, ctrlWrapper(ctrl.removeContact));
router.patch(
  '/:contactId/favorite',
  auth,
  validation(schemas.favoriteSchema),
  ctrlWrapper(ctrl.updateStatus)
);

module.exports = router;

