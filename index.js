const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./Routes/user.route");
const { resRouter } = require("./Routes/Res.route");
const app = express();
require("dotenv").config();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("FOOD DELIVERY APP")
})

app.use("/",userRouter)
app.use("/",resRouter)

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Connected to database")
        console.log("Connected to the server")
    } catch (error) {
        console.log({Message:"Error while making connection",err:error})
    }
})