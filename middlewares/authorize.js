const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/keys");
const User = require("../schemas/User");

module.exports = (req, res, next) =>{
    console.log("Hello from authorize");

    const cookie = req.headers.cookie;

    console.log("The request : ", req);
    //Check if there is authorization in the req headers
    if(!cookie){
        return res.status(401).json({error: "Invalid request!"});
    }

    
    console.log("Authorizer cookie : ", cookie.replace('token=',''));
    //Get the token after 'Bearer'
    const token = cookie.replace('token=','');

    if(!token){
        return res.status(401).json({error: "Invalid request!"});
    }

    //Verify the token
    jwt.verify(token, SECRET_KEY, (err, payload) => {
        if(err){
            if(err instanceof jwt.JsonWebTokenError){
                return res.status(401).json({error : "Invalid credentials!"});

            }
            res.status(400).json({error : "Bad request!"});
            console.log("Error verifying the token : " + err);
        }

        User.findById(payload._id, (err, doc) => {
            req.user = doc;
            console.log(doc);
            next();
        });
    })
    
    
};