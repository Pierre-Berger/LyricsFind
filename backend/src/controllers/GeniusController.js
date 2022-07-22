const Genius = require("genius-lyrics-scrape");
const Lyricist = require("lyricist/node6");
const lyricsFinder = require("@jeve/lyrics-finder");

// const SpotifyWebApi = require("spotify-web-api-node");
const token = process.env.GENIUS_KEY;
const lyricist = new Lyricist(token);
class GeniusController {
  static genius = (req, res) => {
    const { search } = req.body;
    const client = new Genius.Client(token);
    client
      .searchAPI(search)
      .then((searchRes) => {
        res.send(searchRes).status(200);
      })
      .catch((err) => console.error(err));
  };

  static getSong = (req, res) => {
    const { songID } = req.params;

    const client = new Genius.Client(token);
    client
      .getSong(songID)
      .then((searchRes) => {
        res.send(searchRes).status(200);
      })
      .catch((err) => console.error(err));
  };

  static getLyrics = (req, res) => {
    const { songID } = req.params;

    const client = new Genius.Client(token);
    client
      .getSong(songID)
      .then((searchRes) => {
        lyricsFinder
          .LyricsFinder(searchRes.fullTitle)
          .then((data) => {
            res.send(data).status(201);
          })
          .catch((err) => res.status(500).send(err));
      })
      .catch((err) => res.status(500).send(err));
  };

  static youtubeLink = (req, res) => {
    const { songID } = req.params;

    const client = new Genius.Client(token);
    client
      .getSong(songID)
      .then(() => {
        lyricist
          .song(songID)
          .then((response) => {
            res.send(response).status(201);
          })
          .catch((err) => res.status(500).send(err));
      })
      .catch((err) => res.status(500).send(err));
  };
}

module.exports = GeniusController;
