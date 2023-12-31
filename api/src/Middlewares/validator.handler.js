const boom = require('@hapi/boom')

function validatorHandler(schema, property){
  return (req, res, next)=>{
    const date = req[property]
    const { error } = schema.validate(date, { abortEarly: false })
    if(error){
      next(boom.badRequest(error));
    }
    next()
  }
}

module.exports = validatorHandler
