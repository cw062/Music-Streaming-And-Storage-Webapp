const express = require('express');
const { isPasswordCorrect } = require('../services/login-services');
const { checkDatabaseForUsername } = require('../database/access-database');

const iterations = 10000;
let loggedInUsers = [];
const TWO_HOURS = 1000 * 60 * 60 * 2;



const serveLoginPage = (req, res) => {
    res.render('Login', {data: "No message"});
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
        req.session.isLoggedIn = true;
        setInterval(removeUserFromLoggedInUsers, TWO_HOURS, req.session.user);
        loggedInUsers.push(req.session.user);
        res.redirect('/Homepage');
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
    if(req.session.user && req.session.newUser) {
        req.session.newUser = false;
        req.session.isLoggedIn = true;
        loggedInUsers.push(req.session.user);
        setInterval(removeUserFromLoggedInUsers, TWO_HOURS, req.session.user);
        res.redirect('/Homepage');
    } else if (req.session.isLoggedIn) {
        res.redirect('/Homepage');  
    } else if (req.session.user && !loggedInUsers.includes(req.session.user)) {
        loggedInUsers.push(req.session.user);
        req.session.isLoggedIn = true;
        setInterval(removeUserFromLoggedInUsers, TWO_HOURS, req.sessiom.user)
        res.redirect('/Homepage');  
    } else {
        res.redirect('/Login');
    }   
}

function removeUserFromLoggedInUsers(id) {
    if (loggedInUsers.includes(id))
        loggedInUsers.splice(loggedInUsers.indexOf(id), 1);
}




module.exports = {
    serveLoginPage,
    handleLoginAttempt,
    logoutRequest,
    initialRequest,

};