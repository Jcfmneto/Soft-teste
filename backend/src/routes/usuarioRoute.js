import {Router} from "express";
import { criarUsuario } from "../controllers/usuarioController.js";

const router = Router();

router
  .post("/usuarios", criarUsuario);
  
export default router;