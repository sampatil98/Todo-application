const jwt=require("jsonwebtoken");
require("dotenv").config();

function auth(req,res,next){

    try {

        let token=req.headers.authorization;
        if(token){
            token=token.split(" ")[1];
            jwt.verify(token,process.env.Secret_key,(err,decoded)=>{
                if(decoded){
                    req.user=decoded;
                    next();
                }else{
                    return res.status(400).send({
                        isError:true,
                        message:"invalid token"
                    })
                }
            });

        }else{
            res.status(400).send({
                isError:true,
                message:"Unauthorised request. token required"
            });
        }
        
        
    } catch (error) {

        res.status(400).send({
            isError:true,
            message:error.message
        });
        
    }



};

module.exports={auth};