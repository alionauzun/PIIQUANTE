//je difinis un modèle "User" pour la base de données MongoDB
const mongoose = require('mongoose');

//je configure le plugin uniqueValidator pour éviter les doublons d'adresse email
const uniqueValidator = require('mongoose-unique-validator');

//je crée un schéma de données pour les utilisateurs
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
