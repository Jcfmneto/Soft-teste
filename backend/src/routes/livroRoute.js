import { Router } from "express";
import {
  listarLivrosController,
  buscarLivroController,
  criarLivroController,
  atualizarLivroController,
  deletarLivroController
} from "../controllers/livroController.js";

import { authMiddleware } from "../middlewares/autenticado.js";

const router = Router();

router.use(authMiddleware);

router.get("/", listarLivrosController);
router.get("/:id", buscarLivroController);
router.post("/", criarLivroController);
router.put("/:id", atualizarLivroController);
router.delete("/:id", deletarLivroController);

export default router;
