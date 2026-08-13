import express from "express";
import "dotenv/config"
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";

const PORT =process.env.PORT ||3000;

// intialize express
const app=express()
// connectDB
await connectDB()
//middleware
app.use(cors())
app.use(express.json())

app.get('/',(req, res)=> res.send("server is running "))
app.use('/api/user',userRouter)
app.use('/api/owner',ownerRouter)

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})
