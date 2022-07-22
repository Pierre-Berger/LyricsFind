/* eslint-disable camelcase */
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const models = require("../models");

class UserController {
  static connexion = async (req, res, next) => {
    const { email, password } = req.body.data;

    models.user
      .findByEmail(email)
      .then(([response]) => {
        if (response.length === 0) {
          res.sendStatus(500);
        } else {
          const { password_hash, id } = response[0];
          try {
            if (argon2.verify(password_hash, password)) {
              req.email = email;
              req.userid = id;
              next();
            } else {
              res.sendStatus(401);
            }
          } catch (err) {
            res.sendStatus(500);
          }
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static register = async (req, res) => {
    const { email, password } = req.body;
    try {
      const passwordhash = await argon2.hash(password);
      const user = { email, passwordhash };
      models.user
        .create(user)
        .then((response) => res.send(response).status(200))
        .catch((err) => {
          console.error(err);
          res.sendStatus(401);
        });
    } catch (err) {
      res.sendStatus(500);
    }
  };

  static createJwt = (req, res) => {
    const { userid, email } = req;
    const token = jwt.sign(
      { userid, email, exp: 1659342404 },
      process.env.JWT_KEY
    );

    res
      .cookie("userCookie", token, {
        httpOnly: true,
        secure: false,
      })
      .sendStatus(200);
  };

  static findUserByToken = (req, res, next) => {
    const { userCookie } = req.cookies;

    if (userCookie) {
      const token = jwt.verify(userCookie, process.env.JWT_KEY);

      models.user.findByEmail(token.email).then(([response]) => {
        if (response.length === 0) {
          res.sendStatus(500);
        } else {
          req.user = { ...response[0] };
          next();
        }
      });
    } else {
      res.sendStatus(403);
    }
  };

  static authorization = (req, res) => {
    const { userCookie } = req.cookies;
    if (userCookie) {
      const userEmail = jwt.verify(userCookie, process.env.JWT_KEY);
      res.status(201).send(userEmail);
    } else {
      res.sendStatus(403);
    }
  };

  static logout = (req, res) => {
    res.clearCookie("userCookie");
    res.sendStatus(200);
  };

  static addfav = (req, res) => {
    const songID = req.body.data;

    const { user } = req;
    models.user
      .addintofavtable(songID)
      .then((response) => {
        const songid = response[0].insertId;

        const data = { songid, userid: user.id };

        models.user
          .addintojointurefav(data)
          .then((result) => {
            res.send(result).status(200);
          })
          .catch((err) => {
            res.send(err).status(500);
          });
      })
      .catch((err) => {
        if (err.code === "ER_DUP_ENTRY") {
          const data = { songid: songID, userid: user.id };
          models.user
            .addintojointurefav(data)
            .then((result) => {
              res.send(result).status(200);
            })
            .catch(() => res.sendStatus(500));
        } else {
          res.sendStatus(500);
        }
      });
  };

  static deletefav = (req, res) => {
    const songID = req.body.data;
    const { user } = req;
    const data = { songid: songID, userid: user.id };
    models.user
      .deleteinjoiturefav(data)
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  };

  static getfav = (req, res) => {
    const { user } = req;
    models.user
      .getFavourite(user)
      .then(([result]) => res.send(result).status(201))
      .catch(() => res.sendStatus(500));
  };
}

module.exports = UserController;
