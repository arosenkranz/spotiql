require('dotenv').config();
const router = require('express').Router();
const axios = require('axios');
const handlePromise = require('../../utils/promise-handler.js');

const stateKey = 'spotify_auth_state';
let clientRedirectUri;

// generate cookie with this
const generateRandomString = function(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// GET /auth/spotify/login
router.get('/login', (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  clientRedirectUri = req.query.redirect_uri;

  // your application requests authorization
  const scope =
    req.query.scope ||
    'user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing streaming app-remote-control playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private user-library-modify user-library-read user-top-read user-read-playback-position user-read-recently-played user-follow-read user-follow-modify';

  res.redirect(
    `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&scope=${scope}&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&state=${state}`
  );
});

// GET /auth/spotify/callback
router.get('/callback', async (req, res) => {
  // your application requests refresh and access tokens
  // after checking the state parameter
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(`/#error=state_mismatch`);
    return;
  }

  const tokenBody = {
    code,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    grant_type: 'authorization_code'
  };

  res.clearCookie(stateKey);
  console.log('code', code);
  const [tokenErr, { data: tokenData }] = await handlePromise(
    axios({
      url: 'https://accounts.spotify.com/api/token',
      method: 'POST',
      params: {
        code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        grant_type: 'authorization_code',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  );

  if (tokenErr) {
    console.log(tokenErr);
    res.redirect(`/#error=token_error`);
    return;
  }
  console.log(tokenData);
  const { access_token: accessToken, refresh_token: refreshToken } = tokenData;

  // redirect to req.params.redirect_uri
  res.redirect(`${clientRedirectUri}#access_token=${accessToken}&refresh_token=${refreshToken}`);
});

// GET /auth/spotify/refresh?refresh_token=<token>
router.get('/refresh', async (req, res) => {
  // requesting access token from refresh token
  const refreshToken = req.query.refresh_token;

  const [err, { data: newToken }] = await handlePromise(
    axios.post(
      'https://accounts.spotify.com/api/token',
      {
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID} : ${process.env.SPOTIFY_CLIENT_SECRET}
      `
          ).toString('base64')}`
        }
      }
    )
  );

  if (err) {
    res.status(400).json(err);
    return;
  }

  res.json(newToken);
});

module.exports = router;
