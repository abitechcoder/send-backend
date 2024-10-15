const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');
const { upload } = require('../utils/fileUpload');

router.post(
  '/',
  upload.fields([{ name: 'image', maxCount: 1 }]),
  programController.createProgram
);

router.get('/', programController.getAllPrograms);
router.get('/:id', programController.getProgramById);
router.put(
  '/:id',
  upload.fields([{ name: 'image', maxCount: 1 }]),
  programController.updateProgram
);
router.delete('/:id', programController.deleteProgram);

module.exports = router;
