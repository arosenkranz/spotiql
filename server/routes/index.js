const router = require('express').Router();
const path = require('path');
const authRoutes = require('./auth');

router.use('/auth', authRoutes);

if (process.env.NODE_ENV === 'production') {
  router.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
  });
}

module.exports = router;
