// setting up express
const express = require('express')
const app = express();
// setting up mongodb
const mongoose=require("mongoose");
main().catch((err)=>{console.log(err);})
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/ToDoApp");
    console.log("successfully connected");
}
let Todo= require("./models/todo.js");
// port
let port=8080;
// setting up path
const path= require("path");
// setting up others like views public method override and lastly parse 
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
const methodOveride= require("method-override");
app.use(methodOveride("_method"));

// setting up the server listening to the port 
app.listen(port, ()=>{
    console.log("server connected successfully to",port);
});

// send the get request to the common page
app.get("/",(req,res)=>{
    res.render("home.ejs");
})

app.get("/signup",(req,res)=>{
    res.render("signup.ejs");
});

app.post("/signup",(req,res)=>{
    let {name,age,email,day,week,month,occupation,username,password}=req.body;
    let new_todo= new Todo ({
        name:name,
        age:age,
        email:email,
        occupation:occupation,
        username:username,
        password:password
    });
    new_todo.save().then(()=>{
        console.log("saved succesfully");
    }) .catch((err)=>{
        console.log(err);
    });
    res.redirect("/");
});

app.post("/check",async(req,res)=>{
    let {name,age,email,day,week,month,occupation,username,password}=req.body;
    try {
    const user = await Todo.findOne({ username: username, password: password });
    if (user) {
      console.log("Logged in successfully");
    res.redirect(`/:${user._id}/todolist`);
    console.log(`${user._id}`);
    } else {
      console.log(" Wrong username or password");
      res.send("Wrong username or password");
    }
  } catch (err) {
    console.error("Error checking credentials:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/:id/todolist",async(req,res)=>{
    let {id}=req.params;
    id=id.replace(':','');
    let user_info= await Todo.findOne({_id:id});
    res.render("todo_page.ejs",{user_info});
});

app.post("/:id/todolist",(req,res)=>{

})