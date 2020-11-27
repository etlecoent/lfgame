const express = require('express');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');


module.exports = ({
  getGames
}) => {
  
  router.get("/", (req, res) => {
    jsonwebtoken.verify(req.headers.authorization, process.env.JWT_SECRET, (err) => {
      if (err) {

        res.sendStatus(403);
        
      } else {
        getGames()
          .then((games) => res.json(games))
          .catch((err) => res.json({
            error: err.message
          }));
      }
    });
  });

  return router;
};