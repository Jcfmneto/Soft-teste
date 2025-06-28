import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";
import "./style.css";

export default function PaginaAdicionarLivro() {
  const [bookData, setBookData] = useState({
    titulo: "",
    autor: "",
    descricao: ""
  });

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/livros", bookData);
      alert("Livro criado com sucesso!");
      setBookData({ titulo: "", autor: "", descricao: "" });
    } catch (err) {
      console.error(err);
      alert("Erro ao criar livro.");
    }
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo">Livraria</div>
        <div className="nav-links">
          <Link to="/home">Livros</Link>
        </div>
      </nav>

      <h1>Adicionar um Livro</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="titulo"
          placeholder="Nome do Livro"
          value={bookData.titulo}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="descricao"
          placeholder="Descrição"
          value={bookData.descricao}
          onChange={handleChange}
        />
        <input
          type="text"
          name="autor"
          placeholder="Nome do Autor     "
          value={bookData.autor}
          onChange={handleChange}
          required
        />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}
