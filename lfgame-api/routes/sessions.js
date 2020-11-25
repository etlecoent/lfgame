const express = require('express');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');


module.exports = (io, {
  checkForSessionWithSpace,
  addUserToAvailableSession,
  createNewSession,
  usersInSession,
  removeUserFromSession,
  getGameBySession,
  getGameByID
}) => {


  /* Check for available sessions */
  router.post('/', (req, res) => {
    console.log(req.body)
    const { gameID, userID } = req.body;
  
    checkForSessionWithSpace(gameID)
          .then((session) => {
            // if there is a session with space, add them to the session
            if (session) {
              return addUserToAvailableSession(userID, session.id)

              // then go to that session
            } else {
              // if there is not a session with space, create a new session with the game id and add them to that session
              return createNewSession(gameID)
              // set timeout for 12 hours, change status to f after 12 hours 
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

  router.get(`/:sessionID/games`, (req, res) => {
    const { sessionID } = req.params;
    getGameBySession(sessionID)
    .then((game) => {
      res.json(game)
    })
    .catch((err) => res.json({
      error: err.message
    }));
   })

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
      io.to(socket.sessionId).emit("user has joined", {users: res, joiningUser: socket.username})  
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
          io.to(sessionId).emit("user has left", {users: updatedUsers, leavingUser: socket.username});
          socket.leave(socket.sessionId);
        });
      })
    });

  });

  return router;
};