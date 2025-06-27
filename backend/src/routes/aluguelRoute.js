import { Router } from "express";
import { alugarLivroController, devolverLivroController } from "../controllers/aluguelController.js";
import { authMiddleware } from "../middlewares/autenticado.js";

const router = Router();

router.use(authMiddleware);

router.post("/:id/alugar", alugarLivroController);

router.post("/:id/devolver", devolverLivroController);

export default router;