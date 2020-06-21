const JWT = require('jsonwebtoken')
const config = require('../conf')

function assignJWT(req, res, next) {

    const { user } = req
    // this.console.log('cokiee  7 ',req.cookie)
    const jwtToken = JWT.sign({ userId: user._id }, config.JWT_KEY);
    res.cookie('jwtToken', jwtToken, { httpOnly: false })

    // console.log(" 1010 jwtToken",jwtToken)
     res.redirect('/home')


}


module.exports = {
    assignJWT
}