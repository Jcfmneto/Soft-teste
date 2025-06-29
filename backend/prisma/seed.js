import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const userExists = await prisma.user.findFirst();
  if (!userExists) {
    await prisma.user.create({
      data: {
        nome: "Admin",
        email: "admin",
        senha: "admin"
      }
    });
    console.log("Usuário admin criado.");
  } else {
    console.log("Usuário já existe. Ignorando criação.");
  }

  const livrosExistem = await prisma.livro.findFirst();
  if (!livrosExistem) {
    const livros = [
      { titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", descricao: "Uma jornada épica pela Terra Média." },
      { titulo: "1984", autor: "George Orwell", descricao: "Um retrato sombrio de um futuro distópico." },
      { titulo: "Dom Casmurro", autor: "Machado de Assis", descricao: "Um clássico da literatura brasileira." },
      { titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", descricao: "Uma história sobre amizade e essência." },
      { titulo: "A Revolução dos Bichos", autor: "George Orwell", descricao: "Uma crítica alegórica ao totalitarismo." },
      { titulo: "Harry Potter e a Pedra Filosofal", autor: "J.K. Rowling", descricao: "O início da jornada mágica de Harry." },
      { titulo: "O Hobbit", autor: "J.R.R. Tolkien", descricao: "A aventura de Bilbo Bolseiro." },
      { titulo: "Capitães da Areia", autor: "Jorge Amado", descricao: "A vida de crianças marginalizadas em Salvador." },
      { titulo: "Memórias Póstumas de Brás Cubas", autor: "Machado de Assis", descricao: "A narrativa de um defunto-autor." },
      { titulo: "Orgulho e Preconceito", autor: "Jane Austen", descricao: "Um romance sobre sociedade e amor." },
      { titulo: "Cem Anos de Solidão", autor: "Gabriel García Márquez", descricao: "A saga da família Buendía." },
      { titulo: "O Código Da Vinci", autor: "Dan Brown", descricao: "Um thriller de conspiração religiosa." },
      { titulo: "A Menina que Roubava Livros", autor: "Markus Zusak", descricao: "A história de uma jovem durante o nazismo." },
      { titulo: "It: A Coisa", autor: "Stephen King", descricao: "O mal que assombra Derry, Maine." },
      { titulo: "O Nome do Vento", autor: "Patrick Rothfuss", descricao: "A história do lendário Kvothe." },
      { titulo: "O Apanhador no Campo de Centeio", autor: "J.D. Salinger", descricao: "A visão de um jovem inconformado." },
      { titulo: "A Metamorfose", autor: "Franz Kafka", descricao: "Um homem que acorda transformado em inseto." },
      { titulo: "A Ilha do Tesouro", autor: "Robert Louis Stevenson", descricao: "A busca por um tesouro pirata." },
      { titulo: "Drácula", autor: "Bram Stoker", descricao: "O romance gótico sobre o famoso vampiro." },
      { titulo: "Frankenstein", autor: "Mary Shelley", descricao: "A criação de um monstro por um cientista." }
    ];

    for (const livro of livros) {
      await prisma.livro.create({
        data: {
          titulo: livro.titulo,
          autor: livro.autor,
          descricao: livro.descricao,
          alugado: false
        }
      });
    }

    console.log("20 livros criados com sucesso!");
  } else {
    console.log("Livros já existem. Ignorando criação.");
  }

  console.log("Seed finalizado com sucesso!");
}

main()
  .catch((e) => {
    console.error("Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
