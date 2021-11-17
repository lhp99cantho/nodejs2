const express = require('express');
const passport = require('passport');
const router = express.Router();
const siteController = require('../app/controllers/siteController');

router.get('/', siteController.login);
router.post(
    '/',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
    }),
);

module.exports = router;
