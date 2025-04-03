import {Schema}  from "mongoose"
import mongoose from "mongoose"




const userSchema = new Schema({
    username : {
        type : String , 
        required : true , 
    }, 
    email : {
        type : String , 
        required : true , 
        unique : true 
    }, 
    password  : {
        type : String , 
        required : true 
    } , 
    genre : {
        type : String , 
        required : true  
    }
}, {timestamps : true})

const UserModel = mongoose.models.User || mongoose.model("User" , userSchema) ; 

export default UserModel  ; 