const express = require('express');
const router = express.Router();

//configuration du middleware de validation des données
const userCtrl = require('../controllers/user');
// //les routes "post" parce que le frontend envoie des données
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;

