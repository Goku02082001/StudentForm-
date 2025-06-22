import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/db.js'
import userRegister from './routes/authRoutes.js'
import userLogin from './routes/authRoutes.js'
import submissionRoutes from './routes/submissionRoutes.js';
import showAssignment from './routes/showSubmission.js'
import path from 'path';
import fs from 'fs';
import cors from 'cors'
dotenv.config()
const app=express()

const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("'uploads/'folder created");
}

app.use(express.json())
app.use(cors({
    origin:'*'
}))
app.use("/uploads", express.static(path.resolve("uploads"))); 
const PORT=process.env.PORT

app.get('/',(req,res)=>{

    res.send("This is our homePage")
})

app.use('/api',userRegister)
app.use('/api',userLogin)
app.use('/api', submissionRoutes); 
app.use('/api',showAssignment)

app.listen(PORT,()=>{
    connectDB()
    console.log(`Your Server is Connected is SuccesFully ${PORT}`)
})
