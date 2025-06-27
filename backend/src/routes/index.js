import bodyParser from "body-parser";
import usuarioRoutes from "./usuarioRoute.js";
import livroRoutes from "./livroRoute.js";
import aluguelRoutes from "./aluguelRoute.js";

export default app => {
  app.use(bodyParser.json()),
  app.use(usuarioRoutes),
  app.use("/livros", livroRoutes);
  app.use("/alugueis", aluguelRoutes);
};
