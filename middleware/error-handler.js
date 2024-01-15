const {StatusCodes}= require('http-status-codes')
// const {CustomAPIError}= require('../errors')
const errorHandlerMiddleware= (err, req, res, next)=>{
  let customError={
    statusCode: err.statusCode||StatusCodes.INTERNAL_SERVER_ERROR, 
    message:err.message|| 'something went wrong in the custom error object'
  }
  // if(err instanceof CustomAPIError){
  //   return res.status(err.statusCode).json({msg: err.message})
  // }
  if(err.name=== 'ValidationError') {
    customError.message= Object.values(err.errors).map((item)=>item.message).join(',')
  }
  if(err.code && err.code ===11000){
    customError.message=`the duplicate string value for this email ${Object.keys(err.keyValue)} already exists, please select some other mail`
    customError.statusCode= 400
  } 
  if(err.name==='CastError'){
    customError.msg= `No item found with id given as ${err.value}` 
    err.statusCode= 404
  }
  console.log(err);
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
  return res.status(customError.statusCode).json({msg:customError.msg})
}
module.exports= errorHandlerMiddleware