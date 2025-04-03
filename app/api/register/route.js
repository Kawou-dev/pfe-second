// import connectDB from "@/lib/config/connectDB";
// import UserModel from "@/lib/models/User";
// import { NextResponse } from "next/server";
// import bcrypt from "bcrypt"

import { connectDB } from "@/lib/config/connectDB";
import UserModel from "@/lib/models/UserModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"



export async function POST(request){
    try {
        await  connectDB() ; 

        const {username , email , password , genre} = await request.json() ; 
        if(!username ||  !email  || !password  ||  !genre){
            return NextResponse.json({message : "All fields are required"} , {status : 400}) ; 
        }
        const user= await UserModel.findOne({email})
        if(user){
            return NextResponse.json({message : "User already exist"} , {status : 400}) ; 
        }
        if(password.length <6){
            return NextResponse.json({message : "Password must contain 6 characteres"} , {status : 400}) ; 
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({username , email , password : hashedPassword , genre})  ;
        return NextResponse.json({newUser} , {status : 201})
    } catch (error) {
         console.error("Erreur : " , error.message) ; 
         return NextResponse.json({message : "Internal error server"})
    }
}