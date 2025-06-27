import express from "express";
import setUpROutes from "./routes/index.js";


const app = express();
setUpROutes(app);

app.listen(3000, () => {
  console.log("servidor rodando na porta 3000");
});




