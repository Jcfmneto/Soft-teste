import {
  listarLivros,
  buscarLivroPorId,
  criarLivro,
  atualizarLivro,
  deletarLivro,
} from "../services/livroService.js";

export const listarLivrosController = async (req, res) => {
  try {
    const filtro = req.query.q || "";
    const livros = await listarLivros(filtro);
    res.json(livros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const buscarLivroController = async (req, res) => {
  try {
    const livro = await buscarLivroPorId(req.params.id);
    if (!livro) return res.status(404).json({ error: "Livro não encontrado" });
    res.json(livro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const criarLivroController = async (req, res) => {
  try {
    const livro = await criarLivro(req.body);
    res.status(201).json(livro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const atualizarLivroController = async (req, res) => {
  try {
    const livroAtualizado = await atualizarLivro(req.params.id, req.body);
    res.json(livroAtualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deletarLivroController = async (req, res) => {
  try {
    await deletarLivro(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
