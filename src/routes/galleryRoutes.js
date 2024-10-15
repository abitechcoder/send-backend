const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const { upload } = require('../utils/fileUpload');

router.post(
  '/',
  upload.fields([{ name: 'image', maxCount: 1 }]),
  galleryController.createGallery
);

router.get('/', galleryController.getAllGallery);
router.get('/:id', galleryController.getGalleryById);
router.put(
  '/:id',
  upload.fields([{ name: 'image', maxCount: 1 }]),
  galleryController.updateGallery
);
router.delete('/:id', galleryController.deleteGallery);

module.exports = router;
