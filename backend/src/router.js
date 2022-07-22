const express = require("express");
const {
  login,
  callback,
  refreshToken,
} = require("./controllers/SpotifyController");
const { GeniusController } = require("./controllers");
const { UserController } = require("./controllers");

const router = express.Router();

router.post("/search", GeniusController.genius);
router.get("/lyrics/:songID", GeniusController.getLyrics);
router.get("/youtube/:songID", GeniusController.youtubeLink);
router.get("/getsong/:songID", GeniusController.getSong);
// router.get("/spotifyConnection", ItemController.spotifyConnection);
router.get("/user/fav", UserController.findUserByToken, UserController.getfav);
router.post("/user", UserController.connexion, UserController.createJwt);
router.post("/user/register", UserController.register);
router.get("/auth", UserController.authorization);
router.delete("/user", UserController.logout);
router.post("/addfav", UserController.findUserByToken, UserController.addfav);
router.post(
  "/deletefav",
  UserController.findUserByToken,
  UserController.deletefav
);
router.get("/spotify", login);
router.get("/spotify/test/", callback);
router.get("/spotify/refresh", refreshToken);
module.exports = router;
