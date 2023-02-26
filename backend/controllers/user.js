// //Dans une application Express, un contrôleu est un objet JavaScript qui contient des fonctions appelées actions. Ces fonctions sont appelées lorsque les utilisateurs accèdent à une route spécifique. Les contrôleurs sont utilisés pour séparer la logique de routage de l'application Express de la logique de traitement des données.
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = (req, res, next) => {
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
                                'RANDOM_TOKEN_SECRET',
                                { expiresIn: '24h' })
                        });
                })
            .catch(error => res.status(500).json({ error }));
        })
                .catch(error => res.status(500).json({ error }));
    };
