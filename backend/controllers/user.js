//bycrypt permet de hasher le mot de passe
const bcrypt = require('bcrypt');

//jwt permet de créer un token d'authentification
const jwt = require('jsonwebtoken');

const validator = require('validator');

//importation du modèle user pour la création d'un nouvel utilisateur
const User = require('../models/User');



//enregistrement d'un nouvel utilisateur
exports.signup = (req, res, next) => {
    if (!validator.isEmail(req.body.email)) {
        return res.status(400).json({ error: 'Adresse e-mail invalide' });
    }
    //j'utilise la méthode hash de packade de cryptage bcrypt pour hasher le mot de passe
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//connexion d'un utilisateur existant
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire email/mot de passe incorrecte !' });
            }
                bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Paire email/mot de passe incorrecte !'});
                    }
                        res.status(200).json({
                            userId: user._id,
                            token: jwt.sign(
                                { userId: user._id },
                                'SECRET_TOKEN_KEY_RANDOM_STRING_123456789_987654321_123',
                                { expiresIn: '24h' })
                        });
                })
            .catch(error => res.status(500).json({ error }));
        })
                .catch(error => res.status(500).json({ error }));
    };
