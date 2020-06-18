const authMiddleWare=require('./authMiddleWare')

function assignJWTMiddleware(){
    return authMiddleWare.assignJWT
}

module.exports={
    assignJWTMiddleware
}