import {Router} from "express";
import { criarUsuario } from "../controllers/usuarioController.js";
import { loginUsuario } from "../controllers/usuarioController.js";
import { authMiddleware } from "../middlewares/autenticado.js";

const router = Router();

router
  .post("/cadastro", criarUsuario)
  .post("/login", loginUsuario)
  .get("/perfil", authMiddleware, (req, res) => {
    res.json({mensagem: "Você está autenticado!", usuario: req.user});
  });
export default router;