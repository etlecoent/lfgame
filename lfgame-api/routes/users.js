const express = require('express');
const router = express.Router();
const { getPostsByUsers } = require('../helpers/dataHelpers.js');

module.exports = ({
    getUsers,
    getUserByEmail,
    addUser
}) => {
    /* GET users listing. */
    router.get('/', (req, res) => {
        getUsers()
            .then((users) => res.json(users))
            .catch((err) => res.json({
                error: err.message
            }));
    });

    router.post('/register', (req, res) => {

        const {
            username,
            email,
            password
        } = req.body;

        getUserByEmail(email)
            .then(user => {

                if (user) {
                    res.json({
                        msg: 'Sorry, a user account with this email already exists'
                    });
                } else {
                    return addUser(username, email, password)
                }
            })
            .then(newUser => res.json(newUser))
            .catch(err => res.json({
                error: err.message
            }));

    })

    router.post('/login', (req, res) => {
        console.log("CHECK HERE TOO!!!!!!!")

        const {
            email,
            password
        } = req.body;


        getUserByEmail(email)
            .then(user => {

                if (user) {
                    if (user.password === password) {
                        res.json({
                            // Also send the token
                            msg: 'Signed in!'
                        });
                    } else {
                        res.json({
                            // Also send the token
                            msg: 'Wrong password!'
                        });
                    }
                } else {
                    res.json({msg: 'Wrong email adress'})
                }
            })
            .catch(err => res.json({
                error: err.message
            }));

    })


    return router;
};