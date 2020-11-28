const express = require('express');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');



module.exports = ({
    getUserByEmail,
    addUser,
    getUserByUsername,
    getPreviousSessions,
    usersInPrevSession,
    favouriteGame,
    updateUserProfile,
}) => {

    router.post('/register', (req, res) => {

    const {
      username,
      email,
      password
    } = req.body;
        
    Promise.all([
      getUserByEmail(email),
      getUserByUsername(username)
    ]).then((all) => {
      if (all[0] || all[1]) {
        res.status(401).json({
          msg: 'Sorry, a user account with this email or username already exists'
        });
      } else {
        const hashedPassword = bcrypt.hashSync(password, process.env.SALT_ROUNDS | 0);
        addUser(username, email, hashedPassword)
          .then(user => res.json({
            username: user.username,
            email: user.email,
            image: user.image,
            steam_id: user.steam_id,
            id: user.id,
            token: jsonwebtoken.sign({ username: user.username }, process.env.JWT_SECRET)
          }));
      }
    }).catch(err => res.json({
      error: err.message
    }));

  });

  router.post('/login', (req, res) => {

    const {
      email,
      password
    } = req.body;

    getUserByEmail(email)
      .then(user => {

        if (user) {            
          if (bcrypt.compareSync(password, user.password)) {
            res.json({
              username: user.username,
              email: user.email,
              image: user.image,
              steam_id: user.steam_id,
              id: user.id,
              token: jsonwebtoken.sign({ username: user.username }, process.env.JWT_SECRET)
            });
          } else {
            res.status(401).json({ error: 'Wrong password'});
          }
        } else {
          res.status(401).json({ error: 'Wrong email adress'});
        }
      })
      .catch(err => res.json({
        error: err.message
      }));
  });

  router.get('/:username', (req, res) => {

    jsonwebtoken.verify(req.headers.authorization, process.env.JWT_SECRET, (err) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const username = req.params.username;
        getUserByUsername(username)
          .then(user => {
            const result = { user };

            Promise.all([
              getPreviousSessions(user.id),
              favouriteGame(user.id)
            ]).then(all => {
              result.sessionsList = all[0];
              result.favourite = all[1];
              res.json(result);
            });
          })
          .catch((err) => res.json({
            error: err.message
          }));
      }
    });
  });

  router.get('/:username/:id', (req, res) => {
    
    jsonwebtoken.verify(req.headers.authorization, process.env.JWT_SECRET, (err) => {
      if (err) {
        res.sendStatus(403);
      } else {
        usersInPrevSession(req.params.id)
          .then(list => {
            res.json(list);
          })
          .catch((err) => res.json({
            error: err.message
          }));
      }
    });
  });

    router.post('/:username', (req, res) => {

        const {id, avatar, username, email, steamID} = req.body;

        updateUserProfile(avatar, username, email, steamID, id)
        .then(result => {
            res.json({
                username: result.username,
                email: result.email,
                image: result.image,
                steam_id: result.steam_id,
                id: result.id,
                token: jsonwebtoken.sign({ username: result.username }, process.env.JWT_SECRET)
            })
        }).catch(err => res.json({
            error: err.message
        }));
    })


  return router;
};