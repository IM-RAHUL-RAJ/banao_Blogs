const express= require('express');
const path=require('path');
const hbs=require('hbs');
require("./db/conn");

const Register=require('./models/registers');

const app=express();
const static_path=path.join(__dirname,'../public');
// console.log(path.join(__dirname,'../public'));
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(static_path));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set("view engine","hbs");


app.get("/",(req,res)=>{
    res.render("index");
})


app.get("/forget",(req,res)=>{
    res.render("forget");
})

app.post("/forget",async(req,res)=>{
    try{
            const username=req.body.username;
            const newPassword=req.body.newPassword;
            const cPassword=req.body.confirmPassword;
            // const details=await Register.findOne({username:username});
            if(newPassword===cPassword){
                await Register.findOneAndUpdate({username:username},{$set:{password:newPassword}});
                
                
                // prompt("Password Changed");
            }
            else{
                res.send("New Password did not match Confirm Password");
            }
            res.render('index');
    }
    catch(err){

        console.log(err);
    }
})
app.get("/register",(req,res)=>{
    res.render("register");
})

app.post("/home",async(req,res)=>{
    try{
            const username=req.body.sign_username;
            const password=req.body.sign_password;

            const uname=await Register.findOne({username:username});

            console.log(uname);
            if(uname.password===password){
                res.status(201).render("home");
            }
            else{
                res.send("<h1>Password/username did not match</h1>");
            }
    }
    catch(error){
            console.log("invalid username/password");
        }
    
})

app.post("/register",async(req,res)=>{
    try{
        // const name=req.body.name;
        // const email=req.body.email;
        // const username=req.body.username;
        // const password=req.body.password;

        const registerEmployee=new Register({
             
            name:req.body.name,
            email:req.body.email,
            username:req.body.username,
            password:req.body.password
             
        })
        const registered=await registerEmployee.save();
        res.status(201).render("register");
        
    }catch(error){
        res.status(400).send(error);
    }
})


app.listen(3000 || process.env.PORT, ()=>{
    console.log("server running at 3000");
})