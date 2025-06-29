import express from "express";
import setUpRoutes from "./routes/index.js";
import { exec } from "child_process";

exec("npx prisma migrate deploy", (err, stdout, stderr) => {
  if (err) {
    console.error("Erro ao aplicar migrations:");
    console.error(stderr);
    process.exit(1);
  }

  console.log("Migrations aplicadas com sucesso:");
  console.log(stdout);

  exec("npm run seed", (seedErr, seedOut, seedErrOut) => {
    if (seedErr) {
      console.error("Erro ao rodar o seed:");
      console.error(seedErrOut);
      process.exit(1);
    }

    console.log("Seed executado com sucesso:");
    console.log(seedOut);

    const app = express();

    app.use(express.json());
    setUpRoutes(app);

    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  });
});
