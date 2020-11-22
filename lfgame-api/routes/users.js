const express = require('express');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
                    const hashedPassword = bcrypt.hashSync(password, process.env.SALT_ROUNDS | 0)
                    return addUser(username, email, hashedPassword);
                }
            })
            .then(newUser => res.json({
                username: newUser.username,
                token: jsonwebtoken.sign({ username: newUser.username }, process.env.JWT_SECRET)
            }))
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
                    console.log("password: " + password);
                    console.log("user.password: " + user.password)
                
                    if (bcrypt.compareSync(password, user.password)) {
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