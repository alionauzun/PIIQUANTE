//--------ajout du modèle de données User afin de stocker les informations utilisateur dans la base de données---------//

const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

//Ce modèle définit le schéma pour les utilisateurs, qui comprend une adresse e-mail unique et un mot de passe
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
//le plugin vérifie que l'adresse email est unique
userSchema.plugin(uniqueValidator);

//ensuite j'exporte le modèle User pour pouvoir l’utiliser dans le contrôleur user.js.
module.exports = mongoose.model('User', userSchema);
