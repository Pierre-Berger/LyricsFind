/* eslint-disable new-cap */
/* eslint-disable camelcase */
const CLIENT_ID = "478ca27d60af497bbbf8e716c81aa0dd";
const CLIENT_SECRET = "a9296d7efb9943cb839d0c493058198c";
const REDIRECT_URI = "http://localhost:5000/spotify/test";
const querystring = require("querystring");
const axios = require("axios");

// Generate a random string with letters and numbers as per required by the Spotify API
const generateRandomString = function (length) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = "spotify_auth_state";

function login(req, res) {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // Ask for all the scopes this way no limitation
  const scope =
    "user-modify-playback-state user-follow-modify user-read-recently-played user-read-playback-position playlist-read-collaborative user-read-playback-state user-read-email user-top-read playlist-modify-public user-library-modify user-follow-read user-read-currently-playing user-library-read playlist-read-private user-read-private playlist-modify-private";

  const queryParams = querystring.stringify({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    state,
    scope,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
}

function callback(req, res) {
  const code = req.query.code || null;

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: querystring.stringify({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString("base64")}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        const { access_token, refresh_token, expires_in } = response.data;

        const queryParams = querystring.stringify({
          access_token,
          refresh_token,
          expires_in,
        });

        // redirect to React app
        // pass along tokens in query params
        res.redirect(`http://localhost:3000/spotify/login?${queryParams}`);
      } else {
        res.redirect(`/?${querystring.stringify({ error: "invalid_token" })}`);
      }
    })
    .catch((error) => {
      res.send(error);
    });
}

function refreshToken(req, res) {
  const { refresh_token } = req.query;

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString("base64")}`,
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
}

module.exports = { login, callback, refreshToken };
