import { PrismaClient } from "@prisma/client";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

export const registraUsuario = async ({ nome, email, senha }) => {
  const usuarioExistente = await prisma.user.findUnique({
    where: { email },
  });

  if (usuarioExistente) {
    throw new Error("Usuário já cadastrado com esse email.");
  }

  return await prisma.user.create({
    data: { nome, email, senha },
  });
};

export const login = async ({ email, senha }) => {
  const usuario = await prisma.user.findFirst({
    where: { email },
  });

  if (!usuario) {
    throw new Error("Usuário não cadastrado");
  }

  if (senha !== usuario.senha) {
    throw new Error("Usuário ou senha inválidos");
  }

  const accessToken = sign(
    {
      id: usuario.id,
      email: usuario.email,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: 86400,
    }
  );

  return { accessToken };
};
