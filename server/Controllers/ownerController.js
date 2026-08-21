import path from "path";
import imagekit from "../configs/imageKit.js";
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
        let car = JSON.parse(req.body.carData);
        const imageFile = req.file;
        const fileBuffer = fs.readFileSync(imageFile.path)

        // upload image to imageKit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/cars'
        });
        // URL generation
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {
                    width: 1280,
                    crop: 'maintain_ratio',
                    quality: 'auto', //Auto Compress
                    format: 'webp', //convert to modern formats
                },
            ],
        });

        const image=optimizedImageUrl;
        await Car.create({...car, owner: _id, image})
        res.json({success:"true",message:"Car Added"})



    }
    catch {

    }
}