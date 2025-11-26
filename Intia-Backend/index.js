import express from "express";
import dotenv from "dotenv";
import db from "./src/db/config.js";
import userRoute from "./src/routes/userRoutes.js";
import clientRoute from "./src/routes/clientRoutes.js";
import insuranceRoute from "./src/routes/insuranceRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use("/api/auth", userRoute);
app.use("/api/clients", clientRoute);
app.use("/api/insurances", insuranceRoute);

db().then(() => {
    app.listen(PORT, () => {
        console.log(`Server Running on port : ${PORT}`)
    });
});
