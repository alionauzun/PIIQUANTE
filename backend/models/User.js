//--- je crée un schéma de données avec totes les informations dont j'ai besoin pour créer un objet user dans la base de données MongoDB
const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');//---je crée un plugin pour vérifier que l'adresse email est unique

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
