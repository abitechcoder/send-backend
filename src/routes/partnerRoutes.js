const express = require('express');
const router = express.Router();
const partnerController = require('../controllers/partnerController');
const { upload } = require('../utils/fileUpload');

router.post(
  '/',
  upload.fields([{ name: 'logo', maxCount: 1 }]),
  partnerController.createPartner
);

router.get('/', partnerController.getAllPartners);
router.get('/:id', partnerController.getPartnerById);
router.put(
  '/:id',
  upload.fields([{ name: 'logo', maxCount: 1 }]),
  partnerController.updatePartner
);
router.delete('/:id', partnerController.deletePartner);

module.exports = router;
