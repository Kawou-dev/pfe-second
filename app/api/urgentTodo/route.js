//api/urgentTodo/route.js
import { connectDB } from "@/lib/config/connectDB";
import Todo from "@/lib/models/TodoModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(){
    try {
        await connectDB() ; 
        const session = await getServerSession(authOptions) ; 
        if(!session){
            return NextResponse.json({message : "Unauthorized: No session Valid"} , {status : 401}) ;
        }
        const urgsTodo = await Todo.find({ userId : session.user.id , priority: "élevé"}) ;
        return NextResponse.json({urgsTodo}) ; 
    } catch (error) {
        console.error(error.message) ; 
        return NextResponse.json({message : "Hello Kawou error"} , {status : 500}) ;
    }
}