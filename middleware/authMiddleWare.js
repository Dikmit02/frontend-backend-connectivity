const JWT = require('jsonwebtoken')
const config = require('../conf')

function assignJWT(req, res, next) {

    const { user } = req
    const jwtToken = JWT.sign({ userId: user._id }, config.JWT_KEY);
    res.cookie('jwtToken', jwtToken, { httpOnly: true })

    // res.status(200).send({ result: true });
    res.redirect('/login')

}


module.exports = {
    assignJWT
}