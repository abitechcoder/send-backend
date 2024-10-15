const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { upload } = require('../utils/fileUpload');

router.post(
  '/',
  upload.fields([{ name: 'document', maxCount: 1 }]),
  jobController.createJob
);

router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobById);
router.put(
  '/:id',
  upload.fields([{ name: 'document', maxCount: 1 }]),
  jobController.updateJob
);
router.delete('/:id', jobController.deleteJob);

module.exports = router;
