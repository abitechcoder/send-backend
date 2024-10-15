const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const { upload } = require('../utils/fileUpload');

router.post(
  '/',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'document', maxCount: 1 },
  ]),
  testimonialController.createTestimonial
);

router.get('/', testimonialController.getAllTestimonials);
router.get('/:id', testimonialController.getTestimonialById);
router.put(
  '/:id',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'document', maxCount: 1 },
  ]),
  testimonialController.updateTestimonial
);
router.delete('/:id', testimonialController.deleteTestimonial);

module.exports = router;
