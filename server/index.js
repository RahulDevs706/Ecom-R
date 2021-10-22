require('dotenv').config();
const express =require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path")
const cors = require('cors')
app.use(cookieParser());
app.use(express.json());


const corsOptions ={
    AccessControlAllowMethod:'get, put, post',
    AccessControlAllowOrigin:true,
    AccessControlAllowCredentials: true,
    origin:'http address of client side', 
    credentials:true,    
    optionSuccessStatus:200
}



 
app.use(cors(corsOptions))







const port = process.env.PORT

mongoose.connect("mongoose db uri",
 (err)=>{
    if(!err){
        console.log("Succesfully connected to db");
    }else{console.log(err);}
});


const userRouter = require("./routes/UserRoute");
app.use("/user", userRouter);

app.get('/', (req,res)=>{
    res.send("its Working")
})


// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });


app.listen(port, ()=>{
    console.log("express server started");
});
