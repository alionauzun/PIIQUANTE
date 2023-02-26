///---configuration du middleware d'authentification----------------
const jwt = require("jsonwebtoken");

//je crée une fonction qui va vérifier le token de l'utilisateur et le comparer à la clé secrète pour décoder le token et extraire l'ID utilisateur du token 
//si le token est valide, l'ID utilisateur est extrait du token et ajouté à la demande (req.auth.userId)
//si le token n'est pas valide, une erreur est renvoyée au front-end avec le code d'état 401 (non autorisé) 

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
