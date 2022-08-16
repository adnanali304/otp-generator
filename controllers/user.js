
const moment = require("moment");
const Models = require("../models");

exports.createUser = async (req,res) => {
    const {name, phone_number} = req.body;

    if(!name) return res.send({status: "error", msg: "Name is required!"});
    if(!phone_number) return res.send({status: "error", msg: "Phone Number is required!"});

    let user;
    try{
        user = await Models.Users.create({name, phone_number});
    }catch(e){
        return res.send({status: "error", msg: "User Creating Failed!"});
    }

    return res.send({
        status: "success", 
        msg: "User Created!", 
        data: {
            id: user.id,
            name: user.name
        }
    });
}

exports.generateOTP = async (req,res) => {
    const {phone_number} = req.body;

    // Validate phone number
    if(!phone_number) return res.send({status: "error", msg: "Phone Number is required!"});
    const User = await Models.Users.findOne({
        where: {
            phone_number
        }
    })
    if(!User) return res.send({status: "error", msg: "Phone number not exists."});

    /// Save OTP & Expiration Date 
    try{
        User.update({
            otp: Math.floor(1000 + Math.random() * 9999),
            otp_expiration_date: moment().add(5, 'minutes').toDate(),
        });
    }catch(e){
        return res.send({status: "error", msg: "OTP generating failed!"});
    }
    return res.send({
        status: "success",
        msg: "OTP generated!", 
        data: {
            user_id: User.id,
        }
    });
}


exports.verifyOTP = async (req,res) => {
    const {userId} = req.params;
    const {otp} = req.query;
    if(!otp) return res.send({status: "error", msg: "OTP code is required!"});

    // Check User Existence
    const User = await Models.Users.findOne({
        where: {
            id: userId
        }
    })
    if(!User) return res.send({status: "error", msg: "User does not exists"});

    /// Check OTP
    if(User.otp != otp) return res.send({status: "error", msg: "Invalid OTP Code"});
    if(moment().isAfter(User.otp_expiration_date)) return res.send({status: "error", msg: "OTP is expired!"});

    return res.send({
        status: "success",
        msg: "OTP verified!",
        data: User
    });
}