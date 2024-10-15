const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { upload } = require('../utils/fileUpload');

router.post(
  '/',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'document', maxCount: 1 },
  ]),
  projectController.createProject
);

router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.put(
  '/:id',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'document', maxCount: 1 },
  ]),
  projectController.updateProject
);
router.delete('/:id', projectController.deleteProject);

module.exports = router;
