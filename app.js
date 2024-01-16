require('dotenv').config()
require('express-async-errors')
const helmet= require('helmet')
const xss= require('xss-clean')
const cors= require('cors')
const rateLimiter= require('express-rate-limit')

const express= require('express')
const app =express()

const connectDB= require('./db/connect')
const authenticateUser= require('./middleware/authentication')
const authRouter= require('./routes/auth')
const jobRouter= require('./routes/jobs')

const notFoundMiddleware= require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
//routers

app.set('trust proxy',1)
app.use(rateLimiter({
	windowMs: 15 * 60 * 1000,  
	limit: 100, 
}))
app.use(express.json())
app.use(cors())
app.use(xss())
app.use(helmet())
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser,jobRouter)
//error handler
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware) 



//connect db
app.get('/', (req,res)=>{
  res.send('this is the job api')
})


const port= 1000|| process.env.PORT
const start= async()=>{
  try {
    await connectDB(process.env.MONGO_URI)
    console.log('Connected to the database...')
    app.listen((port),()=>{
      console.log( `Server is listening to port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}
start()
      
 
