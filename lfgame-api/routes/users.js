const express = require('express');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');

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
                    res.status(401).json({
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

        const {
            email,
            password
        } = req.body;


        getUserByEmail(email)
            .then(user => {

                if (user) {
                    if (user.password === password) {
                        res.json({
                            username: user.username,
                            token: jsonwebtoken.sign({ username: user.username }, process.env.JWT_SECRET)
                        });
                    } else {
                        res.status(401).json({ error: 'Wrong password'})
                    }
                } else {
                    res.status(401).json({ error: 'Wrong email adress'})
                }
            })
            .catch(err => res.json({
                error: err.message
            }));

    })


    return router;
};