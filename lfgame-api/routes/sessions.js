const express = require('express');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');

const newUsers = [
  {id: 1, username: "user1"},
  {id: 2, username: "user2"},
  {id: 3, username: "user3"},
  {id: 4, username: "user4"}
]
const upDatedUsers = [
  {id: 2, username: "user2"},
  {id: 3, username: "user3"},
  {id: 4, username: "user4"}
]

module.exports = (io, {
  checkForSessionWithSpace
}) => {


  /* Check for available sessions */
  router.get('/', (req, res) => {
    
    checkForSessionWithSpace( 1 )
          .then((session) => res.json(session))
          .catch((err) => res.json({
              error: err.message
          }));
    // if there is a session with space, add them to the session
    // if there is not a session with space, create a new session with the game id and add them to that session
  });

  io.on("connection", (socket) => {
    

    const { sessionId } = socket.handshake.query;
    console.log(`${socket.id} has connected`);
    socket.sessionId = sessionId;
    
    socket.join(socket.sessionId);

    io.to(sessionId).emit("user has joined", JSON.stringify(newUsers));

    socket.on("sending message", (message) => {
      console.log("HIT");
      io.to(socket.sessionId).emit("incoming message", message);
    });

    socket.on("disconnecting", (reason) => {
      console.log(`${socket.id} has left ${socket.rooms}`) 
      
      socket.leave(sessionId);
      io.to(sessionId).emit("user has left", JSON.stringify(upDatedUsers));
      //removes the user from the session
      //sends back the updated list of users in the session
    });

  });

  return router;
};