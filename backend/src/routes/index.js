import bodyParser from "body-parser";
import usuarioRoutes from "./usuarioRoute.js";
import livroRoutes from "./livroRoute.js";
import aluguelRoutes from "./aluguelRoute.js";
import cors from "cors";

export default app => {
  app.use(cors());
  app.use(bodyParser.json()),
  app.use(usuarioRoutes),
  app.use("/livros", livroRoutes);
  app.use("/alugueis", aluguelRoutes);
};
