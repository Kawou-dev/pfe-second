
// api/course

// endpoint pour ajouter un cours et get all cours specifique à un user ;

import { connectDB } from "@/lib/config/connectDB";
import CourseModel from "@/lib/models/CourseModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";


export async function GET(){
    try {
        await connectDB()  ;
        const session = await getServerSession(authOptions) ; 
         if(!session){
            return NextResponse.json({message : "Unauthorized"} , {status : 401}) ; 
         }
        const courses = await CourseModel.find({userId : session.user.id}) ; 
        return NextResponse.json({courses} , {status : 200}) ; 
    } catch (error) {
        console.log("Error fetching courses : " , error.message) ; 
        return NextResponse.json({message: "Internal error "} , {status : 500}) ; 
    }
}

export async function POST(request){
    try {
        await connectDB() ; 
        const session = await getServerSession(authOptions) ; 
        if(!session){
           return NextResponse.json({message : "Unauthorized"} , {status : 401}) ; 
        }
        const {title, notes} = await request.json() ; 
        if(!title){
            return NextResponse.json({message : "Title are required"} , {status: 404}) ; 
        }
        const newCourse = await CourseModel.create({title , notes , userId : session.user.id}) ; 
        return NextResponse.json({newCourse} , {status : 201}) ; 
    } catch (error) {
        console.log("Error posting course : " , error.message) ; 
        return NextResponse.json({message: "Internal error "} , {status : 500}) ; 
    }
}