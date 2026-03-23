import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { clerkMiddleware } from "@clerk/express";
import { connectDB } from './config/db.js';
import doctorRouter from './routes/doctor.Router.js';
import serviceRouter from './routes/service.Router.js';
import appointmentRouter from './routes/appointment.Router.js';
import serviceAppointmentRouter from './routes/serviceAppointmentRoutes.js';



const app= express();
const PORT=4000;

const allowOrigins = ["http://localhost:5173", "http://localhost:5174"];

//  MiddleWare
app.use(cors({
    origin: function(origin,callback){
        if(!origin) return callback(null,true);
        if(allowOrigins.includes(origin)){
            return callback(null,true);
        }
        return callback(new Error ("Not allowed by CORS"));
    },
    credentials:true,
    methods:["GET","POST","PUT","DELETE","OPTIONS"],
    allowedHeaders:["Content-type","Authorization"]
}));
app.use(clerkMiddleware());
app.use(express.json({limit: "20mb"}));
app.use(express.urlencoded({limit:"20mb",extended:true}));


//Data base
connectDB();



// Routes
app.use("/api/doctors",doctorRouter);
app.use("/api/services",serviceRouter);
app.use("/api/appointments",appointmentRouter);
app.use("/api/services-appointments",serviceAppointmentRouter);


app.get('/',(req,res)=>{
    res.send("Api Working")
})


app.listen(PORT,()=>{
    console.log(`Server is Listening on http://localhost:${PORT}`)
})