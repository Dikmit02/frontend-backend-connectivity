const JWT=require('jsonwebtoken')
const config=require('../conf')

//  function  assignJWT  (req,res,next){

//     const user =req
    
//     const jwtToken =  JWT.sign({email:user.email},config.JWT_KEY);
//     console.log("auth  ",jwtToken)
//     res.cookie('jwtToken',jwtToken,{httpOnly:true})
//     console.log("user ",jwtToken)
//     next()
// }




function assignJWT(req,res,next){
    
   const {user} =req
   const jwtToken = JWT.sign({userId:user._id},config.JWT_KEY);
   res.cookie('jwtToken',jwtToken,{httpOnly:true})
   console.log("user ",jwtToken)
//    res.status(200).send({result:true}); res.status(200).send({result:true});
// }
// next()
}


module.exports={
    assignJWT
}