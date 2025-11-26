import mongoose from "mongoose";

const clientSchema = mongoose.Schema({
    fullname: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    address: { type: String },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
        required: true
    }
}, { timestamps: true });

export default mongoose.model("Client", clientSchema);
