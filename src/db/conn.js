const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/banao_employees",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log("error in connection");
})