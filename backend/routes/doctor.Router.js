import express from 'express';
import multer from 'multer';
import doctorAuth from '../middleware/doctorauth.js';
import {createDoctor, deleteDoctor, doctorLogin, getDoctorByID, getDoctors, toggleAvailability, updateDoctor} from "../controllers/doctor.controller.js";

const upload = multer({dest:"/temp"});

const doctorRouter = express.Router();


doctorRouter.get("/",getDoctors);
doctorRouter.post("/login",doctorLogin);
doctorRouter.get("/:id",getDoctorByID);
doctorRouter.post("/",upload.single("image"),createDoctor);


// after login
doctorRouter.put("/:id",doctorAuth,upload.single("image"),updateDoctor);
doctorRouter.post("/:id/toggle-availability",doctorAuth,toggleAvailability);
doctorRouter.delete("/:id",deleteDoctor);


export default doctorRouter;