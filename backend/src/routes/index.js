import bodyParser from "body-parser";
import usuarioRoute from "./usuarioRoute.js";

export default app => {
  app.use(
    bodyParser.json(),
    usuarioRoute
  );
};
