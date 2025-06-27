import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const alugarLivro = async (livroId, usuarioId) => {
  const livro = await prisma.livro.findUnique({ where: { id: Number(livroId) } });
  if (!livro) throw new Error("Livro não encontrado");
  if (livro.alugado) throw new Error("Livro já está alugado");


  await prisma.livro.update({
    where: { id: Number(livroId) },
    data: { alugado: true },
  });

  const aluguel = await prisma.aluguel.create({
    data: {
      livroId: Number(livroId),
      usuarioId: Number(usuarioId),
      dataAluguel: new Date(),
    },
  });

  return aluguel;
};

export const devolverLivro = async (livroId, usuarioId) => {
  const livro = await prisma.livro.findUnique({ where: { id: Number(livroId) } });
  if (!livro) throw new Error("Livro não encontrado");
  if (!livro.alugado) throw new Error("Livro não está alugado");

  const aluguelAtivo = await prisma.aluguel.findFirst({
    where: {
      livroId: Number(livroId),
      usuarioId: Number(usuarioId),
      dataDevolucao: null,
    },
    orderBy: { dataAluguel: "desc" }
  });

  if (!aluguelAtivo) throw new Error("Este livro não está alugado por este usuário");

  await prisma.aluguel.update({
    where: { id: aluguelAtivo.id },
    data: { dataDevolucao: new Date() },
  });

  await prisma.livro.update({
    where: { id: Number(livroId) },
    data: { alugado: false },
  });

  return { message: "Livro devolvido com sucesso" };
};
