import StudentAuthData from "../models/studentAuth.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const AuthLogin=async(req,res)=>{
    const Secret_key=process.env.JWT_SECRET
    try {
       const {email,password}=req.body
       const userData=await StudentAuthData.findOne({email})
       if(!userData)
       {
        res.status(400).json({message:"email is not exist",userData})
       }
       const userPassword=await bcrypt.compare(password,userData.password)
       if(!userPassword)
       {
            res.status(201).json({message:"your password is not exist ",userPassword})
       }

       const token= jwt.sign({id:userData.id,email:userData.email},Secret_key,{expiresIn:'1h'})
       res.status(200).json({message:"your login SuccessFully",token})
    } catch (error) {
        res.status(400).json({message:"Something went wrong",error:error.message})
    }
}

export default AuthLogin