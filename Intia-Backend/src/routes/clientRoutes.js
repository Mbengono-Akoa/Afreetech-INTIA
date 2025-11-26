import { Router } from "express";
import {
    createClient,
    getClients,
    getClientById,
    updateClient,
    deleteClient
} from "../controllers/clientController.js";

const route = Router();

route.post("/", createClient);
route.get("/", getClients);
route.get("/:id", getClientById);
route.put("/:id", updateClient);
route.delete("/:id", deleteClient);

export default route;
