const sauceModels = require('../models/sauceModels');

exports.createSauce = (req, res, next) => {
    delete req.body._id;
    const sauce = new sauceModels({
        ...req.body
    });
    router.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    const sauce = new sauceModels({
        _id: req.params.id,
        ...req.body
    });
    sauceModels.updateOne({ _id: req.params.id }, sauce)
        .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteSauce = (req, res, next) => {
    sauceModels.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
        .catch(error => res.status(400).json({ error }));
}

exports.getOneSauce = (req, res, next) => {
    sauceModels.findOne({
        _id: req.params.id
    })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
}

exports.getAllSauces = (req, res, next) => {
    console.log("sauces");
    sauceModels.find({})
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
}

