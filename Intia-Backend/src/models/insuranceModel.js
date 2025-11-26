import mongoose from "mongoose";

const insuranceSchema = mongoose.Schema({
    type: { type: String, required: true },   // Habitation, Voyage, Auto…
    cost: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: true
    }
}, { timestamps: true });

export default mongoose.model("Insurance", insuranceSchema);
