const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user'); //import des routes pour les utilisateurs
const sauceRoutes = require('./routes/sauces'); //import des routes pour les sauces

//je crée une logique de connexion à la base de données MongoDB Atlas
mongoose.connect("mongodb+srv://aliona:Oignies11@atlascluster.wvmjntm.mongodb.net/Projet6?retryWrites=true&w=majority",
{ useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
    
const app = express();

//je crée un middleware pour gérer les headers de mes requêtes HTTP et éviter les erreurs CORS (Cross Origin Resource Sharing)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//je crée un middleware pour transformer le corps de la requête en objet JavaScript utilisable 
app.use(bodyParser.json());

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;
