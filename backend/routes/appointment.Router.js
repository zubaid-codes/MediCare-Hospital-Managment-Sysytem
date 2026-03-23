import express from "express";
import multer from "multer";
import { clerkMiddleware,requireAuth } from "@clerk/express";
import { cancelAppointment, confirmPayment, craeteAppointments, getAppointment, getAppointmentByDoctor, getAppointmentsByPatient, getRegistredUserCount, getStats, updateAppointment } from "../controllers/appointmentController.js";

const appointmentRouter = express.Router();


// Routes
appointmentRouter.get("/",getAppointment);
appointmentRouter.get("/confirm",confirmPayment);
appointmentRouter.get("/stats/summary",getStats);

// Auth Routes
appointmentRouter.post("/",clerkMiddleware(),requireAuth(),craeteAppointments);
appointmentRouter.get("/me",clerkMiddleware(),requireAuth(),getAppointmentsByPatient);

appointmentRouter.get("/doctor/:doctorId",getAppointmentByDoctor);


appointmentRouter.post("/:id/cancel",cancelAppointment);
appointmentRouter.get("/patients/count",getRegistredUserCount);
appointmentRouter.put("/:id",updateAppointment);

export default appointmentRouter;
