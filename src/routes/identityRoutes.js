const express = require('express');
const router = express.Router();
const identityController = require('../controllers/identityController');

router.post(
  '/',
  identityController.createIdentity
);
router.get('/:id', identityController.getIdentityById);
router.put('/:id', identityController.updateIdentity);

module.exports = router;
