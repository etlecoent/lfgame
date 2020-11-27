const express = require('express');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');


module.exports = ({
  getGames
}) => {
    
  router.get("/", (req, res) => {
    getGames()
      .then((games) => res.json(games))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  return router;
};