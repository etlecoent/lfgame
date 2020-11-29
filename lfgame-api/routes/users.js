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


    router.get('/', (req, res) => {
      console.log("HEADER TOKEN: ", req.headers);
      jsonwebtoken.verify(req.headers.authorization, process.env.JWT_SECRET, (err, data) => {
        if (err) {
          res.sendStatus(403);
        } else {
          getUserByUsername(data.username)
          .then(user => {
            res.json(user)
          })
          .catch(err => res.json(err));
        }
      })
    });

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
            token: jsonwebtoken.sign({ username: user.username, email: user.email, id: user.id }, process.env.JWT_SECRET)
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
              token: jsonwebtoken.sign({ username: user.username, email: user.email, id: user.id }, process.env.JWT_SECRET)
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
        // GET ID FROM TOKEN INSTEAD OF REQ.BODY
        jsonwebtoken.verify(req.headers.authorization, process.env.JWT_SECRET, (err, data) => {
          if (err) {
            res.sendStatus(403);
          } else {
            const {avatar, username, email, steamID} = req.body;
            
            updateUserProfile(avatar, username, email, steamID, data.id)
            .then(result => {
                res.json({
                    token: jsonwebtoken.sign({ username: result.username, email: result.email, id: result.id }, process.env.JWT_SECRET)
                })
            }).catch(err => res.json({
                error: err.message
            }));
      }
    });
  });

  return router;
};