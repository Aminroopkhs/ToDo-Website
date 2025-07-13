const mongoose= require("mongoose");
const todoSchema= mongoose.Schema({
    name: {type:String, require: true},
    age: {type:Number, require:true, min:15},
    occupation:{type:String,require:true},
    username:{type:String,require:true},
    password:{type:String, require:true}
});

const Todo= mongoose.model("Todo",todoSchema);
module.exports=Todo;