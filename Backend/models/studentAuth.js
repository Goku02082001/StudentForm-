import mongoose from "mongoose";

const Studentauth=mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const StudentAuthData=mongoose.model('UserData',Studentauth)
export default StudentAuthData