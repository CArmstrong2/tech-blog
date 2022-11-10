const router = require('express').Router();
const blogRoutes = require('./blogRoutes');
const userRoutes = require('./userRoutes');

router.use('/blog', blogRoutes);
router.use('/users', userRoutes);

module.exports = router;