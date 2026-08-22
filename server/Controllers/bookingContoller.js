import Booking from "../models/Booking.js";
import Car from "../models/car.js";


//Function to check availability of car for a given date
const checkAvailability= async (car,pickupDate,returnDate)=>{
    const bookings=await Booking.find({
        car,
        pickupDate:{$lte:returnDate},
        returnDate:{$gte:pickupDate},

    })
    return booking.length==0;
}
//API to check availability of car for a given date
export const checkAvailabilityofCar=async(req,res)=>{
    try {
        const {location, pickupDate,returnDate}=req.body;

        //Fetch all available of cars for a given location
        const cars = await Car.find({location, isAvailable : true})

        //check car availability for the  given date range using Promise

        const availableCarsPromises=cars.map(async (car)=>{
           const isAvailable = await checkAvailability(car._id, pickupDate, returnDate)

           return {...car._doc, isAvailable : isAvailable}
        })
        let availableCars=await Promise.all(availableCarsPromises);
        availableCars=availableCars.filter(car=>car.isAvailable === true);
        Response.json({success: true,availableCars})
        
        
    } catch (error) {
        console.log(error.message);
        res.json({success : false, message:error.message})
        
    }
}

//API to create booking

export const createBooking=async(req,res)=>{
    try {
        const {_id}=req.user;
        const {car,pickupDate, returnDate}=req.body;

        const isAvailable= await checkAvailability(car,pickupDate, returnDate)
        if(!isAvailable){
            return res.json({success : false, message:"Car is Not Available"})
        }

        const carData= await Car.findById(car)

        //Calculate price based on pickupDate and returnDate
        const picked=new Date(pickupDate);
        const returned= new Date(returnDate);
        const noOfDays= Math.ceil((returned-picked)/(1000*60*60*24));
        const price=carData.pricePerDay * noOfDays;

        await Booking.create({car, owner:carData.owner, user:_id, pickupDate,returnDate,price})
         res.json({success : true, message:"Booking Created"})
    }

    catch (error) {
        console.log(error.message);
        res.json({success : false, message:error.message})
    }
}

//API to list user Booking
export const getUserBooking=async(req,res)=>{
    try {
          const {_id}=req.user;
          const bookings=await Booking.find({user:-id}).populate("car").sort({createdAt:-1});
           res.json({success : true, bookings});
    } catch (error) {
        console.log(error.message);
        res.json({success : false, message:error.message});
    }
}

//API to list owner Booking
export const getOwnerBooking=async(req,res)=>{
    try {
        if(req.user.role !=='owner'){
            return res.json({success : false, message:"Unauthorized"}); 
        }
        const bookings = await Booking.find({owner: req.user._id}).populate('car user').select("-user.password").sort({createdAt:-1})
        res.json({success : true, bookings});
    } catch (error) {
        console.log(error.message);
        res.json({success : false, message:error.message});
    }
}

//API to change the booking status
export const changeBookingStatus = async(req,res)=>{
    try {
        const {_id}=req.user; 
        const {bookingId,status}=req.body; 
        const booking = await Booking.findById(bookingId)
        if(booking.owner.toString() !== _id.toString()){
              return res.json({success : false, message:" Not authorized"}); 
        }
        booking.status=status;
        await booking.save();
        res.json({success : true, message:"status updated"});
    } catch (error) {
        console.log(error.message);
        res.json({success : false, message:error.message});
    }
}