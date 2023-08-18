const express = require('express');
const { isPasswordCorrect } = require('../services/login-services');
const { checkDatabaseForUsername } = require('../database/access-database');

const iterations = 10000;
let loggedInUsers = [];


const serveLoginPage = (req, res) => {
    res.render('Login', {data: "No message"});
    console.log(req.session);
};


const handleLoginAttempt = async (req, res) => {
    let dbrow = await checkDatabaseForUsername(req.body.username);
    
    if (dbrow == 0) {
        res.render('Login', {data: 'Username Incorrect Try Again'});
    }
    else if (!(await isPasswordCorrect(dbrow[0].password, dbrow[0].salt, iterations, req.body.pass))) {
        res.render('Login', {data: 'Password Incorrect Try Again'});
    }
    else if(loggedInUsers.includes(dbrow[0].uid)) {
        res.render('Login', {data: 'User Is Already Logged In on Another Device'});
    }
    else {
        req.session.user = dbrow[0].uid;
        req.session.save(function (err) {
            if (err)
            return next(err)
        });
        res.redirect('../');
    }
}

const logoutRequest = (req, res) => {
    loggedInUsers.splice(loggedInUsers.indexOf(req.session.user), 1);
    req.session.user = null;
    req.session.isLoggedIn = false;
    req.session.save(function (err) {
        if (err) 
            next(err)
        req.session.regenerate(function (err) {
            if (err) next(err)
            res.redirect('/Login');
        });
    });
}

const initialRequest = (req, res) => {
    console.log(req.session);
    console.log(loggedInUsers);
    if(req.session.user && req.session.newUser) {
        req.session.newUser = false;
        req.session.isLoggedIn = true;
        loggedInUsers.push(req.session.user);
        res.render('Homepage');
    } else if (req.session.isLoggedIn) {
        res.render('Homepage');  
    } else if (req.session.user && !loggedInUsers.includes(req.session.user)) {
        loggedInUsers.push(req.session.user);
        req.session.isLoggedIn = true;
        res.render('Homepage');  
    } else {
        res.redirect('/Login');
    }   
}


module.exports = {
    serveLoginPage,
    handleLoginAttempt,
    logoutRequest,
    initialRequest

};