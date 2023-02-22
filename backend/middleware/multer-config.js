//multer est un middleware qui va gérer les fichiers entrants dans les requêtes HTTP et les enregistrer sur le serveur dans un dossier spécifique (images)
const multer = require("multer");

// Dictionnaire des types MIME
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
};

// Configuration de multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
    callback(null, "images");
    },
    filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
    },
});

// Exportation de multer
module.exports = multer({ storage: storage }).single("image");
