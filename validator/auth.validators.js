const Joi =require('joi')

const signUpValidation = Joi.object({
    name: Joi.string().required(),
    email:Joi.string().required(),
    password:Joi.string().required()
})

const loginGoogle = Joi.object({
    code: Joi.string()
})


const loginLocalValidation = Joi.object({
    email:Joi.string().required(),
    password:Joi.string().required()
})
  

module.exports= {
    signUpValidation,loginLocalValidation,loginGoogle
}

