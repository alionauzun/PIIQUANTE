//----------------------la logique métier----------------------
//Un fichier de contrôleur exporte des méthodes qui sont ensuite attribuées aux routes pour améliorer la maintenabilité de l'application

// Importation du modèle sauce
const Sauce = require("../models/Sauce");

// Importation du package fs pour la gestion des fichiers entrants et sortants du serveur
const fs = require("fs");

// Création d'un objet sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    //L'utilisation du mot-clé new avec un modèle Mongoose crée par défaut un champ_id, mais on doit utiliser le paramètre id de la requête pour configurer le Sauce avec le même _id qu'avant.
    delete sauceObject._id;
    delete sauceObject._userId;

    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
        }`,
    });
    sauce.save()
        .then(() => {
        res.status(201).json({ message: "Sauce enregistrée !" });
        })
        .catch((error) => {
        return res.status(500).json({ error });
    });
};

// Modification d'un objet sauce
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        }: { ...req.body };
    delete sauceObject._id;
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
        if (!sauce) {
            return res.status(404).json({ message: "Sauce non trouvée !" });
        }
        //on verifie que l'utilisateur qui veut modifier la sauce est bien le propriétaire de la sauce
        if (sauce.userId !== req.auth.userId) {
            return res.status(401).json({ message: "Not authorized" });
        }
        //la methode updateOne permet de modifier une sauce
        //le premier argument est l'objet de comparaison pour trouver la sauce à modifier donc qui a l'id est egale a l'id qui est envoier dans les parametres de la requete et le deuxième argument c'est les nouvelles versions de l'objet sauce
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
            .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => {
            return res.status(500).json({ error });
        });
    };

// Suppression d'un objet sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            } else {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Sauce supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
};

// Récupération d'un objet sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id,
    })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

// Récupération de toutes les objets sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

// Gestion des likes et dislikes
exports.likeSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    if (req.body.like === 1) {
        Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } })
        .then(() => res.status(200).json({ message: "Sauce liké !" }))
        .catch((error) => res.status(400).json({ error }));
    }
    if (req.body.like === -1) {
        Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } })
        .then(() => res.status(200).json({ message: "Sauce disliké !" }))
        .catch((error) => res.status(400).json({ error }));
    }
    if (req.body.like === 0) {
        Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (sauce.usersLiked.includes(req.body.userId)) {
                Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } })
                .then(() => res.status(200).json({ message: "Like retiré !" }))
                .catch((error) => res.status(400).json({ error }));
            }
            if (sauce.usersDisliked.includes(req.body.userId)) {
                Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } })
                .then(() => res.status(200).json({ message: "Dislike retiré !" }))
                .catch((error) => res.status(400).json({ error }));
            }
        })
        .catch((error) => res.status(400).json({ error }));
    }
};