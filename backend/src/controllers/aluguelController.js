import { alugarLivro, devolverLivro } from "../services/aluguelService.js";

export const alugarLivroController = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const livroId = req.params.id;

    const aluguel = await alugarLivro(livroId, usuarioId);
    res.status(201).json(aluguel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const devolverLivroController = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const livroId = req.params.id;

    const resultado = await devolverLivro(livroId, usuarioId);
    res.json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
