import mongoose from "mongoose";

const branchSchema = mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true }
});

export default mongoose.model("Branch", branchSchema);
