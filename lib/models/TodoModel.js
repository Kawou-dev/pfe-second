import mongoose, { Schema } from "mongoose";

const TodoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    priority: {
        type: String, 
        enum: ["low", "medium", "high"], 
        default : "low" , 
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

const Todo = mongoose.models.todo || mongoose.model("todo", TodoSchema);

export default Todo;
