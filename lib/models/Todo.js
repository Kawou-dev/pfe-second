import mongoose, { Schema } from "mongoose"

const TodoSchema = new Schema({
    title : {
        type: String , 
        required : true 
    },
    description :{
        type: String 
    }, 
    status : {
        type : Boolean , 
        default : false
    }, 
    deadline : {
        type : Date, 
        required : true
    }
}, {timestamps : true })

const Todo = mongoose.models.todo || mongoose.model("todo" , TodoSchema) ; 

export default Todo ; 