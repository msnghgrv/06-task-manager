const user = require('../models/User')
const jwt= require('jsonwebtoken')
const {UnauthenticatedError}= require('../errors')



const auth= async (req, res, next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader ||!authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError(`header isn't alright for the token`)
    }
    const token= authHeader.split(' ')[1]
    console.log(token, ":received token")
    try {

    const payload= jwt.verify(token, process.env.JWT_SECRET)
    console.log('decoded payload:', payload)
    req.user= {userId: payload.userId, name:payload.name}
        next()
    } catch (error) {
        console.log('authentication error:',error)
        throw new UnauthenticatedError('invalid token')
    }
}
module.exports= auth