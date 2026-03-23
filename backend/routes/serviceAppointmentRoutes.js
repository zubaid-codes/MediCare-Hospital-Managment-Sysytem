import express from "express";
import { clerkMiddleware, requireAuth } from "@clerk/express";

import {
  confirmServicePayment,
  createServiceAppointment,
  getServiceAppointmnetByPatient,
  getServiceAppointmentById,
  getServiceAppointments,
  getServiceAppointmentStats,
  updateServiceAppointment,
  cancelServiceAppointment,
} from "../controllers/serviceAppointmentController.js";

const serviceAppointmentRouter = express.Router();

serviceAppointmentRouter.get("/", getServiceAppointments);
serviceAppointmentRouter.get("/confirm", confirmServicePayment);
serviceAppointmentRouter.get("/stats/summary", getServiceAppointmentStats);

serviceAppointmentRouter.post(
  "/",
  clerkMiddleware(),
  requireAuth(),
  createServiceAppointment,
);
serviceAppointmentRouter.get(
  "/me",
  clerkMiddleware(),
  requireAuth(),
  getServiceAppointmnetByPatient,
);


serviceAppointmentRouter.get("/:id",getServiceAppointmentById);
serviceAppointmentRouter.put("/:id",updateServiceAppointment);
serviceAppointmentRouter.post("/:id/cancel",cancelServiceAppointment);

export default serviceAppointmentRouter;