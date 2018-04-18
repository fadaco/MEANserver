/**
 * Created by proteux on 4/15/18.
 */

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

require('../models/Users');
const User = mongoose.model('users');

router.get('/', (req, res)=> {
   res.send('users list');
});

router.post('/register', (req, res) => {
    let errors =[];

    if(!req.body.email){
        errors.push({text: 'The email field can\'t be empty'});
    }

    if(!req.body.number) {
        errors.push({text: 'The phone number can\'t be empty'});
    }

    if(!req.body.password) {
        errors.push({text: 'The password field can\'t be empty'});
    }

    if(errors.length > 0) {
        res.send('error in form');
    }else {
        User.findOne({
            email: req.body.email
        }).then(user => {
            if(user){
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ message: 'Email already taken' }));
            }else {
                const newUser = new User({
                    email: req.body.email,
                    number: req.body.number,
                    username: req.body.username,
                    password: req.body.password
                })
                bcrypt.genSalt(10, (err, salt)=>{
                    bcrypt.hash(newUser.password, salt, (err, hash)=>{
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                res.setHeader('Content-Type', 'application/json');
                                res.send(JSON.stringify({ success: 'Account created successfully' }));
                            })
                    })
                })
            }
        })


    }
});

router.post('/login', (req, res)=>{
    User.findOne({
      email: req.body.email
    }).then((user)=>{
        if(!user){
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ message: 'Email doesn\'t exist' }));
        } else if(user) {

           bcrypt.compare(req.body.password, user.password, (err, isMatch)=>{
               if(err) throw err;
               if(isMatch){
                   const payload = {
                       admin: user.admin
                   }
                   let token = jwt.sign(payload, 'ilovejesus', {
                       expiresIn: 1440
                   })

                   res.send(JSON.stringify({ token, successes: 'Successfully log in' }));
               }else{
                   res.setHeader('Content-Type', 'application/json');
                   res.send(JSON.stringify({ message: 'Password is incorrect' }));
               }
           })


        }
    })
});


module.exports = router;