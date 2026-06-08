const jwt = require("jsonwebtoken");

const User = require("../models/User");

const protect = async(req,res,next)=>{
    let token;

    try{


        //check authorization header
        if(
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ){

            console.log("AUTH HEADER:", req.headers.authorization);// new line
            token = req.headers.authorization.split(" ")[1];

            console.log("TOKEN:", token);// new line

            // verify token
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            // Get user from token
            req.user = await User.findById(decoded.id).select("-password");


            next();
        }
        else{

            return res.status(401).json({
                message:"Not authorized token failed",
            });
        }
    }

    catch(error){

        console.log("JWT ERROR:", error);// new line

        return res.status(401).json({
            message:"Not authorized, token failed",
            error:error.message // new line
        })
    }
};

module.exports= protect;