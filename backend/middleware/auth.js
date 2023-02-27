///---configuration du middleware d'authentification----------------
const jwt = require("jsonwebtoken");

//middleware d'authentification pour sécuriser les routes de l'API
module.exports = (req, res, next) => {
  try { 
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, 'SECRET_TOKEN_KEY_RANDOM_STRING_123456789_987654321_123');
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
