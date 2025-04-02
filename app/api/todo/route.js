import { connectDB } from "@/lib/config/connectDB";
import Todo from "@/lib/models/Todo";
import { NextResponse } from "next/server";

 async function  connect(){
    await connectDB()
 }
 connect() ; 


export async function GET(){
    try {
        const todos = await Todo.find({}) ; 
        console.log("todos: " , todos) ; 
        return NextResponse.json({todos: todos}, {status : 200}) ; 
    } catch (error) {
        console.error("Error fetching todos: " , error.message) ; 
        return NextResponse.json({message: "Internal error server"} , {status : 500}) ; 
    }
}
export async function POST(request){
    try {
        const {title , description , deadline} = await request.json() ; 
        if(!title || !description || !deadline){
            return NextResponse.json({message: "All the fields are required"} , {status : 400})
        }
        const existingTodo = await Todo.findOne({title}) ; 
        if(existingTodo){
            return NextResponse.json({message: "Todo already exist"}, {status: 404}) ; 
        }
        const newTodo = await Todo.create({title, description, deadline}) ; 
        return NextResponse.json({newTodo : newTodo} , {status : 201}) ; 
    } catch (error) {
        console.error("Error fetching todos: " , error.message) ; 
        return NextResponse.json({message: "Internal error server"}) ; 
    }
}
