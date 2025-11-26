import { Router } from "express";
import { Register, Login, Logout } from "../controllers/userController.js";

const route = Router();

route.post("/register", Register);
route.post("/login", Login);
route.post("/logout", Logout);

export default route;