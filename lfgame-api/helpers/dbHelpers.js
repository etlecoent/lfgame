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
    };

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch((err) => err);
  };

  const addUser = (username, email, password) => {
    const query = {
      text: `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *` ,
      values: [username, email, password]
    };

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  const checkForJoinedSession = (userID, sessionID) => {
    const query = {
      text: `SELECT * FROM joined_sessions WHERE user_id = $1 AND session_id = $2` ,
      values: [userID, sessionID]
    };

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  const checkForSessionWithSpace = (gameID, difficultyLevel) => {
    const query = {
      text: `SELECT id FROM sessions WHERE game_id = $1 AND population < 10 AND difficulty_level = $2 AND created_at > now() - interval '1 day'
          LIMIT 1`,
      values: [gameID, difficultyLevel]
    };

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  const findUserIdByUsername = (username) => {
    const query = {
      text: `SELECT id FROM users WHERE username = $1`,
      values: [username]
    };

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  const editSessionPopulation = (sessionID, number) => {
    const query = {
      text: `UPDATE sessions SET population = population + $2 WHERE id = $1`,
      values: [sessionID, number]
    };

    // need to find out how to add 1 to the population of a session after it is updated
    return db.query(query)
      .catch(err => err);
  };

  const addUserToAvailableSession = (userID, sessionID) => {
    const query = {
      text: `INSERT INTO joined_sessions (user_id, session_id) VALUES ($1, $2) RETURNING *`,
      values: [userID, sessionID]
    };

    // need to find out how to add 1 to the population of a session after it is updated
    return db.query(query)
      .then(result => result.rows[0])
      .then(editSessionPopulation(sessionID, 1))
      .catch(err => err);
  };

  const createNewSession = (gameID, difficultyLevel) => {
    const query = {
      text: `INSERT INTO sessions (game_id, difficulty_level) VALUES ($1, $2) RETURNING *`,
      values: [gameID, difficultyLevel]
    };

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  const usersInSession = (sessionID) => {
    const query = {
      text:`SELECT username, image FROM users
                JOIN joined_sessions ON user_id = users.id
                WHERE joined_sessions.session_id = $1
                AND joined_sessions.in_session = true
                GROUP BY users.id`,
      values: [sessionID]
    };

    return db.query(query)
      .then(result => result.rows)
      .catch(err => err);
  };

  const getGames = () => {
    const query = {
      text:`SELECT games.*, COUNT(users.id) AS number_current_gamers FROM games 
        LEFT JOIN sessions ON 
          sessions.game_id = games.id
          AND sessions.created_at > now() - interval '1 day'
        LEFT JOIN joined_sessions ON
          joined_sessions.session_id = sessions.id
          AND joined_sessions.in_session
        LEFT JOIN users ON 
          joined_sessions.user_id = users.id
        GROUP BY games.id
        ORDER BY number_current_gamers DESC,  games.id`
    };

    return db.query(query)
      .then(result => result.rows)
      .catch(err => err);
  };

  const getUserByUsername = username => {
    const query = {
        text: `SELECT id, username, email, image FROM users WHERE users.username = $1`,
        values: [username]
    }

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch((err) => err);
  };

  const removeUserFromSession = (userID, sessionID) => {
    const query = {
      text: `UPDATE joined_sessions SET in_session = false WHERE user_id = $1 AND session_id = $2`,
      values: [userID, sessionID]
    };

    // need to find out how to add 1 to the population of a session after it is updated
    return db.query(query)
      .then(result => result.rows[0])
      .then(editSessionPopulation(sessionID, -1))
      .catch(err => err);
  };

  const userRejoinSession = (userID, sessionID) => {
    const query = {
      text: `UPDATE joined_sessions SET in_session = true WHERE user_id = $1 AND session_id = $2 RETURNING *`,
      values: [userID, sessionID]
    };

    // need to find out how to add 1 to the population of a session after it is updated
    return db.query(query)
      .then(result => result.rows[0])
      .then(editSessionPopulation(sessionID, 1))
      .catch(err => err);
  };

  const getPreviousSessions = (userID) => {
    const query = {
      text: `
        SELECT 
            users.username AS username,
            joined_sessions.id AS joinedID,
            sessions.id AS sessionID,
            sessions.difficulty_level AS difficulty,
            sessions.created_at AS date,
            games.picture_url AS logo,
            games.name
        FROM sessions 
        INNER JOIN joined_sessions ON joined_sessions.session_id = sessions.id 
        INNER JOIN users ON joined_sessions.user_id = users.id 
        INNER JOIN games ON games.id = sessions.game_id 
        WHERE users.id = $1;`,
      values: [userID]
    };

    return db.query(query)
      .then(result => result.rows)
      .catch(err => err);
  };

  const getGameByID = gameID => {

    const query = {
      text: `SELECT * FROM games WHERE id = $1`,
      values: [gameID]
    };

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch((err) => err);
  };

  const getGameBySession = sessionID => {

    const query = {
      text: `SELECT game_id FROM sessions WHERE id = $1`,
      values: [sessionID]
    };

    return db
      .query(query)
      .then(result => getGameByID(result.rows[0].game_id))
      .catch((err) => err);
  };

  const usersInPrevSession = (sessionID) => {
    const query = {
      text:`SELECT username FROM users
              JOIN joined_sessions ON user_id = users.id
              WHERE joined_sessions.session_id = $1
              GROUP BY users.id`,
      values: [sessionID]
    };

    return db.query(query)
      .then(result => result.rows)
      .catch(err => err);
  };

  const favouriteGame = (userID) => {
    const query = {
      text:`
            SELECT games.picture_url, COUNT(*) AS counted
            FROM games
            INNER JOIN sessions ON sessions.game_id = games.id
            INNER JOIN joined_sessions ON joined_sessions.session_id = sessions.id
            INNER JOIN users ON joined_sessions.user_id = users.id
            WHERE users.id = $1
            GROUP BY games.picture_url
            ORDER BY counted DESC
            LIMIT 1;`,
      values: [userID]
    };

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);

  };

  const updateUserProfile = (avatar, username, email, userID) => {
    const query = {
        text: `
            UPDATE users 
            SET image = $1,
            username = $2,
            email = $3
            WHERE id = $4
            RETURNING *`,
        values: [avatar, username, email, userID]
    }

    return db.query(query)
        .then(result => result.rows[0])
        .catch(err => err);
}

  return {
      getUsers,
      getUserByEmail,
      addUser,
      checkForSessionWithSpace,
      addUserToAvailableSession,
      createNewSession,
      usersInSession,
      getGames,
      getUserByUsername,
      removeUserFromSession,
      getPreviousSessions,
      getGameBySession,
      getGameByID,
      usersInPrevSession,
      favouriteGame,
      checkForJoinedSession,
      userRejoinSession,
      updateUserProfile,
  };
};