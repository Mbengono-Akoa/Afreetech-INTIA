import { Router } from "express";
import {
    createInsurance,
    getInsurances,
    getInsuranceById,
    updateInsurance,
    deleteInsurance
} from "../controllers/insuranceController.js";

const route = Router();

route.post("/", createInsurance);
route.get("/", getInsurances);
route.get("/:id", getInsuranceById);
route.put("/:id", updateInsurance);
route.delete("/:id", deleteInsurance);

export default route;
