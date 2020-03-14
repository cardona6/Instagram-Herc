const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.get('/navi', (req, res) => {
    res.render('navigation');
});

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
    const {name, email, password, confirm_password} = req.body;
    const errors = [];
    if (name <= 0) {
        errors.push({text: 'name do not match'})
    }
    if (password != confirm_password){
        errors.push({text: ' password do not match'});
    }
    if (password.length < 4) {
        errors.push({text: 'Password mush be at leads 4 characters'});
    }
    if (errors.length > 0 ){
        res.render('users/signup',{errors, name,email,password,confirm_password});
    }else{
        const emailUser = await User.findOne({email: email});
        if(emailUser){
            req.flash('error_msg','The Email is ready to use');
            res.redirect('/users/signup');
        }else{
        const newUser = new User ({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success msg', 'You are registered');
        res.redirect('/users/signin');
    }
    }
});


module.exports = router;