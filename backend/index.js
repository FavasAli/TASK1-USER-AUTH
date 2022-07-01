import express from 'express'
import dotenv from 'dotenv'
import color from 'colors'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()
connectDB()
const app=express()

app.use(express.json())

// app.get('/',(req,res)=>{
//     res.send('API is staring')
// })
app.use('/api/users',userRoutes)

app.use((req,res,next)=>{
    const error= new Error(`Not Found ${req.originalUrl}`)
    res.status(404)
    next(error)
})

app.use((err,req,res,next)=>{
    const statusCode=res.statusCode === 200 ? 500: res.statusCode
    console.log("first")
    res.status(statusCode)
    res.json({
        message:err.message
    })
})


const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server starting at port ${PORT}`.cyan.bold)
})