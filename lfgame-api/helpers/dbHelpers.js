module.exports = (db) => {
  const getUsers = () => {
      const query = {
          text: 'SELECT * FROM users',
      };

      return db
          .query(query)
          .then((result) => result.rows)
          .catch((err) => err);
  };

  const getUserByEmail = email => {

      const query = {
          text: `SELECT * FROM users WHERE email = $1` ,
          values: [email]
      }

      return db
          .query(query)
          .then(result => result.rows[0])
          .catch((err) => err);
  }

  const addUser = (username, email, password) => {
      const query = {
          text: `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *` ,
          values: [username, email, password]
      }

      return db.query(query)
          .then(result => result.rows[0])
          .catch(err => err);
  }

  const checkForSessionWithSpace = (gameID) => {
      const query = {
          text: `SELECT * FROM sessions WHERE game_id = $1 RETURNING *`,
          values: [gameID]
      }

      return db.query(query)
        .then(result => {
            if (result && result.rows[0].population < 10) {
                result.rows[0].id;
            } else {
                false;
            }
        })
        .catch(err => err);
  };

  const addUserToAvailableSession = (userID, sessionID) => {
      const query = {
          text: `INSERT INTO joined_sessions (user_id, session_id) VALUES ($1, $2) RETURNING *`,
          values: [userID, sessionID]     
      }

      // need to find out how to add 1 to the population of a session after it is updated
      return db.query(query) 
        .then(result => result.rows[0])
        .catch(err => err);
  }

  const createNewSession = (gameID) => {
      const query = {
          text: `INSERT INTO sessions (game_id) VALUES ($1) RETURNING *`,
          values: [gameID]
      }

      return db.query(query)
        .then(result => result.rows[0])
        .catch(err => err);
  }

  const gamersInSession = (sessionID) => {
      const query = {
          text:`SELECT username FROM users
                JOIN joined_sessions ON users.id = user_id
                WHERE joined_sessions.session_id = $1
                GROUP BY users.id`,
          values: [sessionID]
      }

      return db.query(query)
        .then(result => result.rows)
        .catch(err => err);
  }

  return {
      getUsers,
      getUserByEmail,
      addUser,
      checkForSessionWithSpace,
      addUserToAvailableSession,
      createNewSession,
      gamersInSession
  };
};