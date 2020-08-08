import express from "express";
import routes from "./routes";
import cors from "cors";

export const globalUrl = "http://localhost:3333";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
