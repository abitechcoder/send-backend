const express = require('express');
const router = express.Router();
const homepageController = require('../controllers/homepageController');

router.post('/', homepageController.createHomepage);
router.get('/:id', homepageController.getHomepageById);
router.put('/:id', homepageController.updateHomepage);

module.exports = router;
