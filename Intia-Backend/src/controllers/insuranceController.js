import Insurance from "../models/insuranceModel.js";

export const createInsurance = async (req, res) => {
    try {
        const insurance = await Insurance.create(req.body);
        res.status(201).json(insurance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getInsurances = async (req, res) => {
    try {
        const list = await Insurance.find().populate("client");
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getInsuranceById = async (req, res) => {
    try {
        const insurance = await Insurance.findById(req.params.id).populate("client");
        res.status(200).json(insurance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateInsurance = async (req, res) => {
    try {
        const updated = await Insurance.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteInsurance = async (req, res) => {
    try {
        await Insurance.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Insurance Deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
