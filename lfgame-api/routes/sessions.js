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
  checkForSessionWithSpace,
  addUserToAvailableSession,
  createNewSession,
  usersInSession,
  removeUserFromSession
}) => {


  /* Check for available sessions */
  router.post('/', (req, res) => {
    console.log(req.body)
    const { gameID, userID } = req.body;
    // req.userID
    // req.gameID
    // maybe this is how we'll get the shit
    checkForSessionWithSpace(gameID)
          .then((session) => {
            // if there is a session with space, add them to the session
            if (session) {
              return addUserToAvailableSession(userID, session.id)

              // then go to that session
            } else {
              // if there is not a session with space, create a new session with the game id and add them to that session
              return createNewSession(gameID)
              .then(newSession => {
                return addUserToAvailableSession(userID, newSession.id)
              })
            }
          })
          // then go to that session
          .then(joinedSession => {
            res.json({session_id: joinedSession.session_id})
          })
          .catch((err) => res.json({
              error: err.message
          }));

  });

  io.on("connection", (socket) => {
  


    const { sessionId, username, userId } = socket.handshake.query;

    console.log(`${socket.id} has connected`);
    socket.sessionId = sessionId;
    socket.username = username;
    socket.userId = userId;
    // socket.userId = userId;
    
    // Adds the user to the according sessions
    socket.join(socket.sessionId);

    // Sends all the users inside the session to the newly joined user
    usersInSession(socket.sessionId).then(res => {
      io.to(socket.sessionId).emit("user has joined", res)  
    });
  

    socket.on("sending message", (message) => {
      io.to(socket.sessionId).emit("incoming message", message);
    });

    socket.on("disconnecting", (reason) => {
      console.log(`${socket.id} has left ${socket.rooms}`) 
      
      //removes the user from the session
      //sends back the updated list of users in the session
      removeUserFromSession(socket.userId, socket.sessionId).then( res => {
        usersInSession(socket.sessionId).then(updatedUsers => {
          io.to(sessionId).emit("user has left", JSON.stringify(updatedUsers));
          socket.leave(socket.sessionId);
        });
      })
    });

  });

  return router;
};