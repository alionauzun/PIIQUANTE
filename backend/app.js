//------------------je crée une application express------------------
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//importation des routes
const userRoutes = require('./routes/user'); 
const sauceRoutes = require('./routes/sauces');

//importation du package path
const path = require('path');

// connexion à la base de données MongoDB avec mongoose
mongoose.connect("mongodb+srv://aliona:Oignies11@atlascluster.wvmjntm.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true,
        useUnifiedTopology: true })
        .then(() => console.log('Connexion à MongoDB réussie !'))
        .catch(() => console.error('Connexion à MongoDB échouée !'));
    
const app = express();

//je transforme le corps de la requête en objet JS utilisable 
app.use (express.json());

//je configure le header pour éviter les erreurs CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//je configure les routes
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
//je configure le dossier images comme étant un dossier statique
app.use('/images', express.static(path.join(__dirname, 'images')));

//exportation de l'application express
module.exports = app;
