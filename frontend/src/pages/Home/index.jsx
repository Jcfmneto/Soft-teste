import { useEffect, useState } from "react";
import { FaSearch, FaBook, FaPen } from "react-icons/fa";
import api from "../services/api";
import "./style.css";

export default function VerLivrosPage() {
  const [livros, setLivros] = useState([]);
  const [search, setSearch] = useState("");
  const [descricaoVisivel, setDescricaoVisivel] = useState({});
  const [livroParaEditar, setLivroParaEditar] = useState(null);
  const [formEdit, setFormEdit] = useState({ titulo: "", autor: "", descricao: "" });

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const response = await api.get("/livros");
        setLivros(response.data);
      } catch (err) {
        console.error("Erro ao buscar livros:", err);
        alert("Erro ao carregar livros.");
      }
    };
    fetchLivros();
  }, []);

  const alugarLivro = async (id) => {
    try {
      await api.post(`/alugueis/${id}/alugar`);
      alert("Livro alugado com sucesso!");
      setLivros((prev) =>
        prev.map((livro) =>
          livro.id === id ? { ...livro, alugado: true } : livro
        )
      );
    } catch (err) {
      console.error(err);
      alert("Erro ao alugar livro.");
    }
  };

  const devolverLivro = async (id) => {
    try {
      await api.post(`/alugueis/${id}/devolver`);
      alert("Livro devolvido com sucesso!");
      setLivros((prev) =>
        prev.map((livro) =>
          livro.id === id ? { ...livro, alugado: false } : livro
        )
      );
    } catch (err) {
      console.error(err);
      alert("Erro ao devolver livro.");
    }

  };
  const toggleDescricao = (id) => {
    setDescricaoVisivel((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const abrirModalEdicao = (livro) => {
    setLivroParaEditar(livro);
    setFormEdit({
      titulo: livro.titulo,
      autor: livro.autor,
      descricao: livro.descricao,
    });
  };

  const handleSubmitEdicao = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/livros/${livroParaEditar.id}`, formEdit);
      alert("Livro atualizado com sucesso!");
      setLivros((prev) =>
        prev.map((livro) =>
          livro.id === livroParaEditar.id
            ? { ...livro, ...formEdit }
            : livro
        )
      );
      setLivroParaEditar(null);
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar livro.");
    }
  };

  const handleDeleteLivro = async () => {
    if (!window.confirm("Tem certeza que deseja deletar este livro?")) return;

    try {
      await api.delete(`/livros/${livroParaEditar.id}`);
      alert("Livro deletado com sucesso!");
      setLivros((prev) => prev.filter((livro) => livro.id !== livroParaEditar.id));
      setLivroParaEditar(null);
    } catch (err) {
      console.error(err);
      alert("Erro ao deletar livro.");
    }
  };

  const livrosFiltrados = livros.filter((livro) =>
    livro.titulo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo">📚 Livraria</div>
        <div className="nav-links">
          <a href="/AdicionarLivros">Adicionar Livro</a>
        </div>
      </nav>

      <div className="conteudo">
        <h1 className="subtitulo">Livros</h1>

        <input
          type="text"
          className="search-input"
          placeholder="Buscar por título..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="book-list">
          {livrosFiltrados.length === 0 ? (
            <p style={{ color: "white" }}>Nenhum livro encontrado.</p>
          ) : (
            livrosFiltrados.map((livro) => (
              <div key={livro.id} className="book-card">
                <div className="titulo-linha">
                  <h3 className="titulo-livro">{livro.titulo}</h3>
                  <button
                    className="btn-lupa"
                    onClick={() => toggleDescricao(livro.id)}
                    title={descricaoVisivel[livro.id] ? "Ver menos" : "Ver mais"}
                  >
                    <FaSearch />
                  </button>
                </div>
                <p><strong>Autor:</strong> {livro.autor}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={livro.alugado ? "status-alugado" : "status-disponivel"}>
                    {livro.alugado ? "Alugado" : "Disponível"}
                  </span>
                </p>
                {descricaoVisivel[livro.id] && (
                  <p><strong>Descrição:</strong> {livro.descricao}</p>
                )}

                <div className="botoes">
                  <button
                    className={`btn-alugar ${livro.alugado ? "devolver" : "alugar"}`}
                    onClick={() =>
                      livro.alugado
                        ? devolverLivro(livro.id)
                        : alugarLivro(livro.id)
                    }
                  >
                    <FaBook />
                    {livro.alugado ? "Devolver" : "Alugar"}
                  </button>

                  <button
                    className="btn-editar"
                    onClick={() => {
                      if (livro.alugado) {
                        alert("Não é possível editar um livro que está alugado.");
                      } else {
                        abrirModalEdicao(livro);
                      }
                    }}
                  >
                    <FaPen />
              Editar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {livroParaEditar && (
        <div className="modal-overlay" onClick={() => setLivroParaEditar(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Editar Livro</h2>
            <form onSubmit={handleSubmitEdicao}>
              <label>Título:</label>
              <input
                type="text"
                value={formEdit.titulo}
                onChange={(e) =>
                  setFormEdit((prev) => ({ ...prev, titulo: e.target.value }))
                }
                required
              />

              <label>Autor:</label>
              <input
                type="text"
                value={formEdit.autor}
                onChange={(e) =>
                  setFormEdit((prev) => ({ ...prev, autor: e.target.value }))
                }
                required
              />

              <label>Descrição:</label>
              <textarea
                value={formEdit.descricao}
                onChange={(e) =>
                  setFormEdit((prev) => ({ ...prev, descricao: e.target.value }))
                }
              />

              <div className="modal-buttons">
                <button type="submit">Salvar</button>
                <button type="button" onClick={() => setLivroParaEditar(null)}>
            Cancelar
                </button>
                <button
                  type="button"
                  className="btn-delete"
                  onClick={handleDeleteLivro}
                >
            Deletar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
