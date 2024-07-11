import express from "express";
import colors from "colors";
import router from "./routes/auth.js";
import DbConnection from "./utils/DataBaseConnection.js";
import dataRouter from "./routes/data.js";
import verifyToken from "./utils/verify.js";
import cors from "cors";
import dotenv from "dotenv";

export const secretKey = "0aaOUOUMp5+ra4j1TYUpQ967jthj0kuKaGgqV/iSvus=";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

DbConnection();
const PORT = process.env.PORT || 3001 
console.log(process.env.PORT)

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api", router);
app.use("/api", verifyToken, dataRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgWhite);
});
