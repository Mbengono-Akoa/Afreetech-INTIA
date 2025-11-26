import jwt from "jsonwebtoken";

export const UserAuthMiddleware = async (req, res, next) => {
    try {
        const token =  req.cookies.token;

        if(!token){
            return res.status(401).json({ message : "Access Denied" });
        }

        const decode = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userid = decode._id;

        next();

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};