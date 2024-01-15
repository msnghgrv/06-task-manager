const User= require('../models/User')
const {BadRequestError, UnauthenticatedError}= require('../errors')
const {StatusCodes}= require('http-status-codes')
const jwt= require('jsonwebtoken')



const register= async (req,res)=>{
    const user= await User.create({ ...req.body })
    console.log(user)
    // creating token
    const token= user.createJWT()
    res.status(StatusCodes.CREATED).json({user:{ name:user.getName()}, token})
  
}
const login= async(req,res)=>{
    const {email, password}= req.body
    if(!email ||!password){
        throw new BadRequestError('Invalid credentials for email and password')
    }
    const user = await User.findOne({email})
    if(!user){
        throw new BadRequestError('Invalid Credentials')
    }
    const isPasswordCorrect= await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('incorrect Password')
    }
    const token= user.createJWT()
    res.status(StatusCodes.OK).json({user:{name: user.name}, token})

}
module.exports= {login, register} 