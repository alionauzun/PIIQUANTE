//------------------je crée une application express------------------

const express = require('express');
//importation du package body-parser pour analyser les requêtes entrantes et les rendre accessibles dans req.body 
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//importation des routes
const userRoutes = require('./routes/user'); 
const sauceRoutes = require('./routes/sauces');

//importation du package path pour accéder au chemin de notre système de fichiers
const path = require('path');

// connexion à la base de données MongoDB avec mongoose
mongoose.connect("mongodb+srv://aliona:Oignies11@atlascluster.wvmjntm.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true,
        useUnifiedTopology: true })
        .then(() => console.log('Connexion à MongoDB réussie !'))
        .catch(() => console.error('Connexion à MongoDB échouée !'));
    
const app = express();

//ajoût du middleware express.json() qui extrercte le corps JSON et gerer les requêtes POST envoyées par le frontend
app.use (express.json());

//j'implémente CORS pour que le front-end effectuer des appels vers l'application en toute sécurité
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//je configure les routes
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
//je configure le serveur pour renvoyer les images de manière statique
app.use('/images', express.static(path.join(__dirname, 'images')));

//exportation de l'application express
module.exports = app;
