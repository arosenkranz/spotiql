const router = require('express').Router();
const path = require('path');
const authRoutes = require('./auth');

router.use('/auth', authRoutes);

router.use('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/client/build/index.html'));
});

module.exports = router;
