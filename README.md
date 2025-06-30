# Sistema de Aluguel de Livros

Este é um sistema completo de aluguel de livros desenvolvido com **Node.js** utilizando **Express.js** no backend, com **Prisma ORM** para persistência de dados e autenticação via **JWT**.

No frontend, foi utilizada a biblioteca **React.js** para criação da interface de usuário, junto com o **Vite** para facilitar e acelerar o desenvolvimento.

[📄 Documentação Funcional (PDF)](docs/documentacao-funcional.pdf)

---

## Tecnologias Utilizadas

- ✅ Node.js  
- ✅ Express.js  
- ✅ React.js  
- ✅ JavaScript (ES6+)  
- ✅ Prisma ORM  
- ✅ PostgreSQL (via Docker e Docker Compose)  
- ✅ Jest (para testes)  
- ✅ Vite (bundler e ferramenta de desenvolvimento frontend)  
- ✅ Docker Compose (orquestração dos containers)  

---

## Funcionalidades

- 🔐 Login obrigatório para acessar o sistema.
- 📚 Exibição da lista de livros com busca.
- 📖 Visualização de detalhes de cada livro.
- 📦 Aluguel de livros.
- ✏️ Cadastro, edição e remoção de livros.
- 🐳 Suporte para rodar a aplicação via Docker.

---

## Pré-requisitos

Para rodar o projeto, você só precisa ter o **Docker** e o **Docker Compose** instalados na sua máquina, pois toda a aplicação está dockerizada e orquestrada via Docker Compose.

---

## Como Executar o Projeto

```bash
# Clone o repositório
git clone https://github.com/Jcfmneto/teste-React.git

# Acesse a pasta do projeto
cd teste-React

# Suba os containers com Docker Compose
docker-compose up
```
A aplicação estará disponível em: http://localhost:5173/

Na página inicial, será necessário fazer login para acessar o sistema.
Credenciais padrão para acesso:

Usuário: admin

Senha: admin

---


## Rodando os testes

Para executar os testes unitários do backend, siga os passos abaixo:

```bash
cd Backend
npm install
npm run test
```
---

## Estrutura do projeto

```bash
.
├── Backend/
│   ├── prisma/
│   │   ├── migrations
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── alugelController.js
│   │   │   ├── livroController.js
│   │   │   └── usuarioController.js
│   │   ├── middlewares/
│   │   │   └── autenticado.js
│   │   ├── routes/
│   │   │   ├── aluguelRoute.js
│   │   │   ├── index.js
│   │   │   ├── livroRoute.js
│   │   │   └── usuarioRoute.js
│   │   ├── services/
│   │   │   ├── __tests__
│   │   │   └── livroService.tests.js
│   │   ├── aluguelService.js
│   │   ├── usuarioService.js
│   │   ├── livroService.js
│   │   └── index.js
│   ├── .env
│   ├── .gitignore
│   ├── dockerfile
│   ├── eslint.config.js
│   ├── jest.config.js
│   ├── package-lock.json
│   ├── package.json
│   └── yarn.lock
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── privateRoute.jsx
│   │   ├── pages/
│   │   │   ├── AdicionarLivros/
│   │   │   │   ├── index.jsx
│   │   │   │   └── style.css
│   │   │   ├── Home/
│   │   │   │   ├── index.jsx
│   │   │   │   └── style.css
│   │   │   ├── Login/
│   │   │   │   ├── index.jsx
│   │   │   │   └── style.css
│   │   │   ├── notFound/
│   │   │   │   └── notFound.jsx
│   │   │   └── services/
│   │   │       └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── Main.jsx
│   ├── .gitignore
│   ├── dockerfile
│   ├── eslint.config.js
│   ├── index.html 
│   ├── package-lock.json
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yaml
└── .gitignore
```
---

## Autor 

Este projeto foi desenvolvido por **Júlio Cesar**, projeto Full Stack com Node.js, React e Docker.

- GitHub: [@Jcfmneto](https://github.com/Jcfmneto)
- LinkedIn: [juliomouraneto](https://www.linkedin.com/in/juliomouraneto/)

