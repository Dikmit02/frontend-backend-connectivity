const express = require('express');
const authController = require('../../controllers/auth.controllers')
const middleware = require('../../middleware/index')
const authValidator = require('../../validator/auth.validators')
const validator = require('express-joi-validation').createValidator({})
const Router = express.Router();



Router.route('/getUser')
    .post(authController.getUser)

Router.route('/signUp')
    .post(validator.body(authValidator.signUpValidation), authController.SignUpHandler, middleware.assignJWTMiddleware())

Router.route('/loginLocal')
    .post(validator.body(authValidator.loginLocalValidation), authController.loginLocal)


// router.route('/loginGoogle')
// .get(validator.body(authValidator.loginGoogle),authController.loginGoogle,middleware.assignJWTMiddleware())

Router.route('/google-auth').get((req, res) => {
    const url = authController.urlGoogle()
    res.redirect(url);

})

Router.route('/myword').get(authController.SignUpGoogle, middleware.assignJWTMiddleware(),authController.getUser)

Router.route('/loginGoogle').get(authController.LoginGoogle, authController.getUser)
module.exports = Router


// Router.route('/myword').get(async (req, res, next) => {

//     const code = req.query.code
//     const { data } = await authController.getTokenFromCode(code)
//     const user = await authController.getuserInfo(data);
//     res.locals.user=user
//     next()
// },(req, res, next)=>{
//     const{email,name}=res.locals.user.data
//     console.log("bhbjhnj ",res.locals.user, "bhjcbhjbcdhjbcdhjdchjdc  ",email,name)

// })
