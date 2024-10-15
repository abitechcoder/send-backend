const express = require('express');
const router = express.Router();
const galleryRoutes = require('./galleryRoutes');
const reportRoutes = require('./reportRoutes');
const partnerRoutes = require('./partnerRoutes');
const teamRoutes = require('./teamRoutes');
const jobRoutes = require('./jobRoutes');
const identityRoutes = require('./identityRoutes');
const homepageRoutes = require('./homepageRoutes');
const testimonialRoutes = require('./testimonialRoutes');
const programRoutes = require('./programRoutes');
const projectRoutes = require('./projectRoutes');

router.use('/gallery', galleryRoutes);
router.use('/reports', reportRoutes);
router.use('/partners', partnerRoutes);
router.use('/team', teamRoutes);
router.use('/job', jobRoutes);
router.use('/identity', identityRoutes);
router.use('/home', homepageRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/programs', programRoutes);
router.use('/projects', projectRoutes);

module.exports = router;
