const mongoose= require("mongoose");
const todoSchema= mongoose.Schema({
    name: {type:String, require: true},
    age: {type:Number, require:true, min:15},
    email:{type:String,require:true},
    day:{type:String,require:false},
    week:{type:String,require:false},
    month:{type:String,require:false},
    occupation:{type:String,require:true},
    username:{type:String,require:true},
    password:{type:String, require:true}
});

const Todo= mongoose.model("Todo",todoSchema);
module.exports=Todo;