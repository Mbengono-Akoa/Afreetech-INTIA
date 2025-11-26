import mongoose from "mongoose";
import Branch from "../models/branchModel.js";

const db = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected Successfully");

        const count = await Branch.countDocuments();

        if (count === 0) {
            console.log("No branches found. Initializing branches...");

            await Branch.insertMany([
                { name: "INTIA - Direction Générale", location: "Yaoundé" },
                { name: "INTIA - Douala", location: "Douala" },
                { name: "INTIA - Yaoundé", location: "Yaoundé" },
            ]);

            console.log("Branches Initialized Successfully");
        } else {
            console.log(`Branches already exist (${count}) — no seeding needed.`);
        }

    } catch (error) {
        console.log("Database Error:", error.message);
    }
};

export default db;
