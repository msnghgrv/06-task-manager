const mongoose= require('mongoose')
const connectDB= async (url)=>{
  return mongoose.connect(url, {
    useCreateIndex:true, 
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true,
  })
}
module.exports= connectDB