'use strict';
const express = require('express');
const userRouter = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('connect-flash');

// Render login forms
userRouter.get('/login', (req, res) => {
    res.render('login', {
        error: req.flash('error')
    });
});

userRouter.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/user/login',
        failureFlash: true
    })(req, res, next);
});

// Render register forms
userRouter.get('/signup', (req, res) => {
    res.render('signup');
});

userRouter.post('/signup', async (req, res) => {
    try {
        const {fullName, email, password, password2, gender, depot} = req.body;
        const isUser = true;
        let errors = [];
        
        // Filling validation
        if (!fullName || !email || !password || !gender || !depot) {
            errors.push({message: "Tolong masukkan nama, email, password, gender, dan nama gudang Anda dalam form"});
        };

        // Password confirmation validation
        if (password !== password2) {
            errors.push({message: "Tolong masukkan password yang sama pada kedua form password"})
        }

        // Password length validation
        if (password.length <= 8) {
            errors.push({message: "Panjang password setidaknya 8 karakter"})
        }

        if (errors.length > 0) {
            // Re render forms
            res.render('signup', {
                errors,
                fullName,
                email,
                password,
                password2,
                gender,
                depot
            })
        } else {
            // check the existing email in the database
            User.findOne({email: email})
                .then(user => {
                    if (user) {
                        errors.push({message: "Email sudah terdaftar"});
                        res.render('signup', {
                            errors,
                            fullName,
                            email,
                            password,
                            password2,
                            gender,
                            depot
                        })
                    } else {
                       const hashedPassword = bcrypt.hash(req.body.password, 10);
                       const newUser = new User({
                            fullName,
                            email,
                            password,
                            password2,
                            gender,
                            depot
                       });
                        
                        newUser.save().then(res.redirect('/dashboard'));
                    }
                })

        } // End of else statement for error length

    } catch {
        res.render('error', {
            message: "Terdapat error yang ambigu, silahkan kontak pengembang :("
        })
    }
}); // End of post handling

module.exports = userRouter;