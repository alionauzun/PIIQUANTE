//----Je crée un serveur HTTP en utilisant le module "http" et l'application express "app" (importé depuis le fichier app.js)----//

const http = require("http");
const app = require("./app"); 

//je crée une constante "normalizePort" qui renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne ;
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
//J’utilise la fonction "normalizePort" vérifie si le port fourni par l'environnement est valide, sinon il utilise le port 3000.
const port = normalizePort(process.env.PORT || "3000");

//la fonction "errorHandler" gère les erreurs de serveur
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string"
      ? "pipe " + address
      : "port: " + port;
  switch (
    error.code
  ) {
    //"EACCES" signifie que le serveur n'a pas les droits pour utiliser le port
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;

    //"EADDRINUSE" signifie que le port est déjà utilisé
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//je crée un serveur HTTP
const server = http.createServer(app); 

//Les événements "error" et "listening" gerent les erreurs et les messages de confirmation de lancement du serveur
server.on("error", errorHandler); 
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
});

 //je lance le serveur sur le port
server.listen(port);
