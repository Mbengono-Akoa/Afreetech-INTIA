import Client from "../models/clientModel.js";

export const createClient = async (req, res) => {
    try {
        const newClient = await Client.create(req.body);
        res.status(201).json(newClient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getClients = async (req, res) => {
    try {
        const clients = await Client.find().populate("branch");
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id).populate("branch");
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateClient = async (req, res) => {
    try {
        const updated = await Client.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteClient = async (req, res) => {
    try {
        await Client.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Client Deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
