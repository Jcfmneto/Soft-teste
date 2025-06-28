import express from "express";
import setUpROutes from "./routes/index.js";

const app = express();


setUpROutes(app);

app.listen(3000);




