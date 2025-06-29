/* eslint-disable */

import { jest } from "@jest/globals";

const prismaMock = {
  livro: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

jest.unstable_mockModule("@prisma/client", () => ({
  PrismaClient: jest.fn(() => prismaMock),
}));

const {
  listarLivros,
  buscarLivroPorId,
  criarLivro,
  atualizarLivro,
  deletarLivro,
  alugarLivro,
} = await import("../livroService.js");

describe("livrosService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("listarLivros retorna lista filtrada corretamente", async () => {
    prismaMock.livro.findMany.mockResolvedValue([
      { id: 1, titulo: "Livro 1", autor: "Autor 1", alugado: false },
    ]);

    const resultado = await listarLivros("Livro");
    expect(prismaMock.livro.findMany).toHaveBeenCalledWith({
      where: {
        OR: [
          { titulo: { contains: "Livro", mode: "insensitive" } },
          { autor: { contains: "Livro", mode: "insensitive" } },
        ],
      },
    });
    expect(resultado).toHaveLength(1);
  });

  test("criarLivro cria um novo livro corretamente", async () => {
    const novoLivro = { titulo: "Novo Livro", autor: "Autor", descricao: "Descrição" };
    const esperado = { id: 1, ...novoLivro, alugado: false };

    prismaMock.livro.create.mockResolvedValue(esperado);

    const resultado = await criarLivro(novoLivro);

    expect(prismaMock.livro.create).toHaveBeenCalledWith({
      data: { ...novoLivro, alugado: false },
    });
    expect(resultado).toEqual(esperado);
  });

  test("atualizarLivro atualiza livro não alugado", async () => {
    const id = 1;
    const dados = { titulo: "Atualizado" };

    prismaMock.livro.findUnique.mockResolvedValue({ id, alugado: false });
    prismaMock.livro.update.mockResolvedValue({ id, ...dados });

    const resultado = await atualizarLivro(id, dados);

    expect(prismaMock.livro.findUnique).toHaveBeenCalledWith({ where: { id } });
    expect(prismaMock.livro.update).toHaveBeenCalledWith({ where: { id }, data: dados });
    expect(resultado).toEqual({ id, ...dados });
  });

  test("atualizarLivro lança erro se livro não existe", async () => {
    prismaMock.livro.findUnique.mockResolvedValue(null);
    await expect(atualizarLivro(99, {})).rejects.toThrow("Livro não encontrado");
  });

  test("atualizarLivro lança erro se livro está alugado", async () => {
    prismaMock.livro.findUnique.mockResolvedValue({ id: 1, alugado: true });
    await expect(atualizarLivro(1, {})).rejects.toThrow("Não é possível editar livro alugado");
  });

  test("deletarLivro remove livro não alugado", async () => {
    const livro = { id: 1, alugado: false };

    prismaMock.livro.findUnique.mockResolvedValue(livro);
    prismaMock.livro.delete.mockResolvedValue(livro);

    const resultado = await deletarLivro(1);

    expect(prismaMock.livro.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(prismaMock.livro.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(resultado).toEqual(livro);
  });

  test("deletarLivro lança erro se livro não existe", async () => {
    prismaMock.livro.findUnique.mockResolvedValue(null);
    await expect(deletarLivro(99)).rejects.toThrow("Livro não encontrado");
  });

  test("deletarLivro lança erro se livro está alugado", async () => {
    prismaMock.livro.findUnique.mockResolvedValue({ id: 1, alugado: true });
    await expect(deletarLivro(1)).rejects.toThrow("Não é possível remover livro alugado");
  });
});
