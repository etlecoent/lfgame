const express = require('express');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');

const newUsers = [
  {id: 1, username: "user1"},
  {id: 2, username: "user2"},
  {id: 3, username: "user3"},
  {id: 4, username: "user4"}
]

module.exports = (io, {
  checkForSessionWithSpace
}) => {


  /* Check for available sessions */
  router.get('/', (req, res) => {
    const { /*Game ID*/ } = req.body;  
    
    checkForSessionWithSpace( /*Game ID*/ )
          .then((session) => res.json(session))
          .catch((err) => res.json({
              error: err.message
          }));
  });


  io.on("connection", (socket) => {
    
    
    const { sessionId } = socket.handshake.query;
    console.log("Connection to soket established");
    
    socket.join(sessionId);

    // // Join a conversation
    
    io.to(sessionId).emit("Hello", `Socket ${sessionId} joined`);
    io.to(sessionId).emit("users", JSON.stringify(newUsers));  
  });

  return router;
};