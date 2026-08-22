import express from "express"
import { changeBookingStatus, checkAvailabilityofCar, createBooking, getOwnerBooking, getUserBooking } from "../Controllers/bookingContoller.js";
import protect from "../middleware/auth.js";

const bookingRouter=express.Router();

bookingRouter.post('/check-availability',checkAvailabilityofCar);
bookingRouter.post('/create',protect, createBooking);
bookingRouter.get('/user',protect, getUserBooking);
bookingRouter.get('/owner',protect, getOwnerBooking);
bookingRouter.post('/change-status',protect,changeBookingStatus);

export default bookingRouter;

