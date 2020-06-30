const router = require('express').Router();
const spotifyAuthRoutes = require('./spotify-auth');

router.use('/spotify', spotifyAuthRoutes);

module.exports = router;
