const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/siteController');

router.get('/timkiem', siteController.timkiem);
router.get('/register', siteController.register);
router.post('/register', siteController.signup)
router.get('/test', siteController.test)
router.get('/', siteController.index);

module.exports = router;
