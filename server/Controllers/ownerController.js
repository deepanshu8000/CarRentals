
import imagekit from "../configs/imageKit.js";
import Booking from "../models/Booking.js";
import Car from "../models/car.js"
import User from "../models/user.js";
import fs from "fs";

// api to change role
export const changeRoleToOwner = async (req, res) => {
    try {
        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { role: "owner" })
        res.json({ success: true, message: "Now, you can list a car" })
    }
    catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }

}
// api to list car
export const addCar = async (req, res) => {
    try {
        const { _id } = req.user
        let car = JSON.parse(req.body.carData)
        const imageFile = req.file
        const fileBuffer = fs.readFileSync(imageFile.path)

        // upload image to imageKit
        const response = await imagekit.files.upload({
            file: fileBuffer.toString('base64'),
            fileName: imageFile.originalname,
            folder: '/cars'
        });

        const image = response.url;
        await Car.create({ ...car, owner: _id, image })
        res.json({ success: true, message: "Car Added" })



    }
    catch (error) {
        console.log(error.message)
        res.json({
            success: false,
            message: error.message
        })
    }
}

//API TO List Owners Car
export const getOwnerCar = async (req, res) => {
    try {
        const { _id } = req.user;
        const cars = await Car.find({ owner: _id })
        res.json({ success: true, cars })
    }
    catch (error) {
        console.log(error.message)
        res.json({
            success: false,
            message: error.message
        })
    }
}

//API TO Toggle Car Availability

export const toggleCarAvailability = async (req, res) => {
    try {
        const { _id } = req.user;
        const { carId } = req.body;
        const car = await Car.findById(carId)

        //checking car belongs to user or not
        if (car.owner.toString() !== _id.toString()) {
            return res.json({ success: true, message: "Unauthorized" });
        }
        car.isAvailable = !car.isAvailable;
        await car.save()

        res.json({ success: true, message: "Availability Toggled" })
    }
    catch (error) {
        console.log(error.message)
        res.json({
            success: false,
            message: error.message
        })
    }
}

//API TO Delete a Car

export const deleteCar= async (req,res)=>{
      try {
        const {_id}=req.user;
        const {carId}=req.body;
        const car=await Car.findById(carId)
        
        //checking car belongs to user or not
        if(car.owner.toString() !== _id.toString()){
            return  res.json({success: true ,message: "Unauthorized"});
        }
        car.owner=null;
        car.isAvailable=false;
        await car.save()

        res.json({success: true ,message: "Car Removed"})
    }
    catch (error) {
        console.log(error.message)
        res.json({
            success: false,
            message: error.message
        })
    }
}

//API To Get Dashboard Data

export const getdashboardData= async (req,res)=>{
      try {
        const {_id,role}=req.user;
        if(role!='owner'){
            return  res.json({success: false ,message: "Unauthorized"});
        }
        const cars=await Car.find({owner:_id});
        const bookings=await Booking.find({owner:_id}).populate('car').sort({createdAt:-1});

        const pendingBookings = await Booking.find({owner:_id, status:"pending"});
        const confirmedBookings = await Booking.find({owner:_id, status:"confirmed"});

        //Calculate monthly revenue from confirmed bookings

        const monthlyRevenue=bookings.slice().filter(booking=>booking.status==="confirmed").reduce((acc,booking)=>acc+booking.price,0)

        const dashboardData={
            totalCars:cars.length,
            totalBookings:booking.length,
            pendingBookings:pendingBookings.length,
            confirmedBookings:confirmedBookings.length,
            recentBookings:bookings.slice(0,3),
            monthlyRevenue
        }
        res.json({success: true ,dashboardData});
    }
    catch (error) {
        console.log(error.message);
        res.json({success: false,message: error.message});
    }
}

//API to update user image
export const updateUserImage = async (req,res)=>{
    try {
        const {_id}=req.user;
        const imageFile = req.file
        const fileBuffer = fs.readFileSync(imageFile.path)

        // upload image to imageKit
        const response = await imagekit.files.upload({
            file: fileBuffer.toString('base64'),
            fileName: imageFile.originalname,
            folder: '/users'
        });

        const image = response.url;
        await User.findByIdAndUpdate(_id, { image });
        res.json({ success: true, message: "Image Updated" })

    } catch (error) {
        console.log(error.message);
        res.json({success: false,message: error.message});
    }
}