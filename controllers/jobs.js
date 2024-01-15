const Job= require('../models/Job')
const {StatusCodes}= require('http-status-codes')
const {BadRequestError,NotFoundError }= require('../errors')

const getAllJobs= async(req,res)=>{
    const jobs = await Job.find({createdBy: req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({jobs, count:jobs.length})

}
const getJob= async(req, res)=>{
    const {user:{userId},params:{id:JobId} }= req
    const job = await Job.findOne({
        _id: JobId,createdBy:userId
    })
    console.log('job found')
    if(!job){
        // console.log(error)
       throw new NotFoundError("Id doesn't match with the job you're looking for.")}
       res.status(StatusCodes.OK).json({job})
}
const createJob= async(req, res)=>{
    req.body.createdBy= req.user.userId
    const job= await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}
const updateJob= async(req, res)=>{
    const {
        body:{company, position},
        user:{userId},
        params:{id:JobId} }= req
        if(company=== ''|| position ===''){
            throw new BadRequestError(`company or position fields can't be left empty`)
        }
        const job= await Job.findByIdAndUpdate({_id:JobId, createdBy:userId}, req.body,{new:true})
        if(!job){
            console.log(error)
           throw new NotFoundError("Id doesn't match with the job you're looking for.")}
        res.status(StatusCodes.OK).json({msg:"job updated", job})

}
const deleteJob=  async(req, res)=>{
    const {user:{userId},
    params:{id:JobId}
            }= req
        const job= await Job.findByIdAndDelete({_id:JobId, createdBy:userId})
        if(!job){
            console.log(error)
           throw new NotFoundError("Id doesn't match with the job you're looking for.")}
        res.status(StatusCodes.OK).json({msg:"job deleted"})
}
module.exports= {getAllJobs, getJob, createJob, updateJob, deleteJob}