const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// User Model
const User = require('../model/User');

// authentication middlewaer
const { authenticated } = require('../config/authenticate');

router.get('/login', authenticated, (req, res) => {
    res.render('login', { oauth: false });
});

router.get('/register', authenticated, (req, res) => {
    res.render('register', { oauth: false });
});

router.post('/register', (req, res) => {
    const { name, email, password, rePassword } = req.body;

    let errors = [];
    if (!name || !email || !password || !rePassword) {
        errors.push({ msg: 'You forgot to fill some fields' });
    }
    if (password.length != rePassword.length) {
        errors.push({ msg: 'Please slap your head to enter same password' });
    }

    if (errors.length > 0) {
        res.render('register', { errors, name, email, password, rePassword });
    }
    else {
        User.findOne({ email: email }, (err, user) => {
            // user exists 
            if (user) {
                errors.push({ msg: 'Email already registered' });
                res.render('register', { errors, name, email, password, rePassword });
            }
            else {
                // creating new user using User model
                const newUser = new User({ name, email, password, date: new Date() });
                // hashing password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        console.log('New User created: ' + newUser);
                        // saving new user to database
                        newUser.save((err, user) => {
                            //console.log('New User details stored in database');
                            req.flash('successMsg', 'Registration successful. Please Login');
                            res.redirect('/auth/login');
                        });
                    });
                });
            }
        });
    }

});

// user login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/home/dashboard',
        failureRedirect: '/auth/login',
        failureFlash: true
    })(req, res, next);
});

// user logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('successMsg', 'Logout successful');
    res.redirect('/auth/login');
});

module.exports = router;