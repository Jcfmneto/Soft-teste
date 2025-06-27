import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const listarLivros = async (filtro) => {
  const where = filtro ? {
    OR: [
      { titulo: { contains: filtro, mode: "insensitive" } },
      { autor: { contains: filtro, mode: "insensitive" } },
    ]
  } : {};

  return await prisma.livro.findMany({ where });
};

export const buscarLivroPorId = async (id) => {
  return await prisma.livro.findUnique({ where: { id: Number(id) } });
};

export const criarLivro = async ({ titulo, autor, descricao }) => {
  return await prisma.livro.create({
    data: {
      titulo,
      autor,
      descricao,
      alugado: false,
    }
  });
};

export const atualizarLivro = async (id, dados) => {
  const livro = await buscarLivroPorId(id);
  if (!livro) throw new Error("Livro não encontrado");
  if (livro.alugado) throw new Error("Não é possível editar livro alugado");

  return await prisma.livro.update({
    where: { id: Number(id) },
    data: dados,
  });
};

export const deletarLivro = async (id) => {
  const livro = await buscarLivroPorId(id);
  if (!livro) throw new Error("Livro não encontrado");
  if (livro.alugado) throw new Error("Não é possível remover livro alugado");

  return await prisma.livro.delete({
    where: { id: Number(id) }
  });
};

export const alugarLivro = async (id) => {
  const livro = await buscarLivroPorId(id);
  if (!livro) throw new Error("Livro não encontrado");
  if (livro.alugado) throw new Error("Livro já está alugado");

  return await prisma.livro.update({
    where: { id: Number(id) },
    data: { alugado: true },
  });
};
