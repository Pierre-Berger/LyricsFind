const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  static table = "user";

  create(user) {
    return this.connection.query(
      `INSERT INTO ${UserManager.table} (email , password_hash) VALUES (? , ?)`,
      [user.email, user.passwordhash]
    );
  }

  findByEmail(email) {
    return this.connection.query(
      `select * from  ${this.table} where email = ?`,
      [email]
    );
  }

  addintofavtable(songId) {
    return this.connection.query(
      `insert into favourite_list (song_id) values (?)`,
      [songId]
    );
  }

  addintojointurefav(data) {
    return this.connection.query(
      `insert into User_has_favourite (userid , songid) values (? , ?)`,
      [data.userid, data.songid]
    );
  }

  deleteinjoiturefav(data) {
    return this.connection.query(
      `delete from User_has_favourite where (userid = ? AND songid = ?)`,
      [data.userid, data.songid]
    );
  }

  getFavourite(user) {
    return this.connection.query(
      `select * from User_has_favourite where (userid = ?)`,
      [user.id]
    );
  }
}

module.exports = UserManager;
