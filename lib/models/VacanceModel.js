import mongoose, { Schema } from "mongoose"
const vacanceSchema = new Schema({
       cityName : {
            type : String,
            required : true , 
       },
       experience : {
            type :String , 
            required : false 
       }, 
       images : {
              type  : [String], 
              required : true 
       } , 
        userId : {
          type : String , 
          ref : "UserModel" , 
          required : true
        }
}, {timestamps : true  }) ; 

const Vacances = mongoose.models.vacance || mongoose.model("vacance" , vacanceSchema) ; 

export default Vacances ; 