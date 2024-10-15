const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportsController');
const { upload } = require('../utils/fileUpload');

router.post(
  '/',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'document', maxCount: 1 },
  ]),
  reportController.createReport
);

router.get('/', reportController.getAllReports);
router.get('/:id', reportController.getReportById);
router.put(
  '/:id',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'document', maxCount: 1 },
  ]),
  reportController.updateReport
);
router.delete('/:id', reportController.deleteReport);

module.exports = router;
