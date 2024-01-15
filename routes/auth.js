const express= require('express')
const mongoose= require('mongoose')
const UserSchema= require('../models/User')
const router= express.Router()
const {login, register}= require('../controllers/auth')
router.route('/login').post(login)
router.route('/register').post(register)


module.exports= router