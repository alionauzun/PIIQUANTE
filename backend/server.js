// je crée un serveur HTTP en utilisant le module "http"et l'application express
const http = require("http");
const app = require("./app");

//la fonction "normalizePort" vérifie si le port fourni par l'environnement est valide, sinon le port 3000 est utilisé
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
const port = normalizePort(process.env.PORT || "3000");

//La fonction "errorHandler" gère les erreurs de serveur qui peuvent se produire pendant l'exécution du serveur
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
    case "EACCES":
      console.error(bind + " requires elevated privileges."); 
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default: 
      throw error;
  }
};

//je crée un serveur
const server = http.createServer(app);

//les événements "error" et "listening" sont gérés pour afficher des messages appropriés en cas d'erreur ou de succès de l'exécution du serveur 
server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  // console.log("Listening on " + bind);
});
server.listen(port);