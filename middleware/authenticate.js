const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req,res,next)=>{
    let token = req.headers.authorization
    if(token){
        jwt.verify(token, process.env.KEY, function(err, decoded) {
            if(decoded){
                next()
            }else{
                res.send(err)
            }
          });
    }else{
        res.send("token invalid")
    }
}

module.exports ={
    authenticate
}