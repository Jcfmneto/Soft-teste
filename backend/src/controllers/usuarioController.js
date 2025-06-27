import {registraUsuario, login} from "../services/usuarioServices.js";



export const criarUsuario = async (req, res) => {
  try{
    const novoUsuario = await registraUsuario(req.body);
    res.status(201).json({
      id: novoUsuario.id,
      nome: novoUsuario.nome,
      email: novoUsuario.email
    });
  }catch (error){
    res.status(400).json({error: error.message});
  }
};;

export const loginUsuario = async (req, res) => {
  try{
    const token = await login(req.body);
    res.status(200).json(token);
  }catch(error){
    res.status(403).json({error: error.message});
  }
};
