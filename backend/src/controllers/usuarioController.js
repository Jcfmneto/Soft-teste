import {registraUsuario} from "../services/usuarioServices.js";
import {login} from "../services/usuarioServices.js";


export const criarUsuario = async (req, res) => {
  try{
    const novoUsuario = await registraUsuario(req.body);
    res.status(201).json(novoUsuario);
  }catch (error){
    res.status(400).json({error: error.message});
  }
};

export const loginUsuario = async (req, res) => {
  try{
    const token = await login(req.body);
    res.status(200).json(token);
  }catch(error){
    res.status(403).json({error: error.message});
  }
};
