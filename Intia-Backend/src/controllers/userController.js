import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                status: "error",
                error: "All Fields Required!",
                statusCode: 400,
            });
        }

        const existUser = await userModel.findOne({email});
        if(existUser){
            return res.status(409).json({
                status: "error",
                message: "User already registered!",
                statusCode: 409,
            });
        }

        const salt =  await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);
        
        const newUser =  new userModel({
            name,
            email,
            password: hashPass
        });

        await newUser.save();
        const token = await jwt.sign({
            _id: newUser._id,
        },
        process.env.TOKEN_SECRET
    );

    console.log("token", token);

    if(!token){
        return res.status(401).json({ message: "Access Denied" });
    }

    return res.cookie("token", token, {
        httpOnly: true,
    }).status(200).json({
            status: "success",
            statusCode: 200,
            message: "Registered Successfully",
            data: newUser,
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: "error",
            error: "Internal server error",
            message: error.message,
            statusCode: 500,
        });
    }
};

export const Login =  async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({
                status: "error",
                message: "All Fileds Required!",
            });
        }

        const LoginUser =  await userModel.findOne({ email });
        if(!LoginUser){
            return res.status(400).json({
                message: "Email not found!...",
                statusCode: 404,
            });
        }

        const checkPass = await bcrypt.compare(password, LoginUser.password);
        if(!checkPass){
            return res.status(401).json({
                message: "Invalid Password",
            });
        }

        const token = await jwt.sign({
            _id: LoginUser._id,
        },
        process.env.TOKEN_SECRET
    );

    if(!token){
        return res.status(401).json({ message: "Access denied. No token generated!" });
    }

    return res.cookie("token", token, {
        httpOnly: true,
    }).status(200).json({
        status: "success",
        message: "Login Successfully!...",
        token,
        data: LoginUser,
        statusCode: 200
    });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: "error",
            error: "Internal server error",
            message: error.message,
            statusCode: 500,
        });
    }
};

export const Logout = async (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({
        message: "Logout Sucessfully!..."
    });
};