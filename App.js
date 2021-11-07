// const mongoose = require("mongoose");
const dotenv = require("dotenv")
const express = require("express");
const app = express(); 

dotenv.config({path:"./config.env"});
require("./db/conn")
const port = process.env.PORT




//middleware  demo examole
const middleware =(req,res,next)=>{
    console.log("hello my middleware")
    next();

}
// middleware();
// app.get("/about",middleware,(req,res)=>{}






app.get("/",(req,res)=>{

    res.status(200)
    res.send("hello world")

});
app.get("/home",(req,res)=>{

    res.status(200)
    res.send("this is home page")

});
app.get("/about",middleware,(req,res)=>{

console.log("About user")
    res.status(200)
    res.send("this is about page")

});
app.get("/contact",(req,res)=>{

    res.status(200)
    res.send("this is contact page")

});
app.get("/login",(req,res)=>{

    res.status(200)
    res.send("this is login page")

});
app.get("/signup",(req,res)=>{

    res.status(200)
    res.send("this is signupf page")

});

app.listen(port, ()=>{

    console.log(`web server listen port no  ${port}  succesfully` )

})