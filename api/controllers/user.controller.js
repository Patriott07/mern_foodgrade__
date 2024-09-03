import { Otp } from "../models/otp.model.js";
import { Users } from "../models/users.model.js"
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

import Cryptr from 'cryptr';
const cryptr = new Cryptr('myTotallySecretKey');

const emailTransporter = nodemailer.createTransport({
    // service: 'gmail',
    host: "smtp.gmail.com",
    auth: {
        user: 'pwangtampn@gmail.com',
        pass: 'psecerqnpeenrmhh'
    }
});

export const getUsers = async (req, res) => {
    try {
        const users = await Users.find();
        console.log("data ada", users)
        res.json({ users: users });
    } catch (error) {
        console.log(error)
    }
}

export const createUser = async (req, res) => {
    try {
        console.log(req.body);
        const userCreate = await Users.create(req.body);
        // console.log("data ada", userCreate)
        res.json({ user: userCreate });
    } catch (error) {
        console.log(error)
    }
}

export const registerAction = async (req, res) => {
    const { username, email, password } = req.body;
    try {

        // cek is Email has used.
        const isUsedEmail = await Users.findOne({ email });
        if (isUsedEmail) return res.status(502).json({ message: "Your email has registered. Choose another email" });

        let hashInt = 10;
        let roleDefault = 'user';
        bcrypt.hash(password, hashInt, async (err, hashed) => {
            if (err) return res.status(502).json({ message: "trouble" });
            const user = await Users.create({ username, email, password: hashed, role : roleDefault });

            let single = Math.floor(Math.random() * 9) + 1;
            let kode = single.toString();
            for (let i = 0; i < 3; i++) {
                // const element = array[i];
                let single = Math.floor(Math.random() * 9) + 1;
                kode += single.toString();
            }

            const otp = Otp.create({ email, kode: kode, kadaluarsa: new Date(new Date().getTime() + 60 * 60 * 1000), created_at: new Date() })
            const urlOtp = `http://localhost:3000/manifest/log/${email.replace('@gmail.com', '')}/credentials/otp`;

            const mailOptions = {
                from: 'patriotdiscord1107@gmail.com',
                to: email,
                subject: `Verify Your Email ${kode}`,
                html: `Please click the following link to verify your email: <a href="${urlOtp}">${urlOtp}</a>`
            };
            await emailTransporter.sendMail(mailOptions);
            res.json({ message: "Register succes please verify your account.", user, otp, urlOtp });
        });
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
}

export const refreshOtp = async (req, res) => {
    try {
        const { email } = req.body;
        await Otp.deleteMany({
            email: email
        });

        let single = Math.floor(Math.random() * 9) + 1;
        let kode = single.toString();
        for (let i = 0; i < 3; i++) {
            // const element = array[i];
            let single = Math.floor(Math.random() * 9) + 1;
            kode += single.toString();
        }

        const otp = Otp.create({ email, kode: kode, kadaluarsa: new Date(new Date().getTime() + 60 * 60 * 1000), created_at: new Date() })
        const urlOtp = `http://localhost:3000/manifest/log/${email.replace('@gmail.com', '')}/credentials/otp`;

        const mailOptions = {
            from: 'patriotdiscord1107@gmail.com',
            to: email,
            subject: `Verify Your Email ${kode}`,
            html: `Please click the following link to verify your email: <a href="${urlOtp}">${urlOtp}</a>`
        };
        await emailTransporter.sendMail(mailOptions);

        res.json({ message: "Your verification code has sended" });
    } catch (error) {
        console.log(error)
    }
}

export const verifyOtp = async (req, res) => {
    try {
        const { kode, email } = req.body;

        let otpCredentials = await Otp.findOne({ kode: kode, email });
        if (!otpCredentials) {
            return res.status(403).json({ message: "Code Verification wrong or fail." });
        }

        if (new Date() > otpCredentials.kadaluarsa) {
            return res.status(403).json({ message: "Your code has expired.", datenow: new Date(), otpkadaluarsa: otpCredentials.kadaluarsa });
        }

        const user = await Users.findOne({ email: email });
        user.isVerified = true;
        user.save();

        await Otp.deleteMany({ email })

        res.json({ message: "Your verification is correct!", id: user._id });
    } catch (error) {
        console.log({ error });
    }
}

export const loginaction = async (req, res) => {
    const { email, password } = req.body;

    const user = await Users.findOne({
        email: email,
        isVerified: true
    });

    if (!user) return res.status(403).json({ message: "Credentials is invalid." });

    if (!bcrypt.compare(password, user.password)) return res.status(403).json({ message: "Credentials is invalid." });

    return res.json({ message: "Welcome", user });
}

export const forgetPassword = async (req, res) => {
    try {
        let { email } = req.body;
        // generate and send new password
        bcrypt.hash(new Date(new Date().getTime()).toString(), 5, async (err, newPass) => {
            if (err) return res.status(502).json({ message: 'Something wrong in the server' });

            const generate = newPass.replace(/[^a-zA-Z0-9]/g, '').substring(0, 10); // Trim to 10 characters

            const user = await Users.findOne({
                email, email,
                isVerified: true
            });

            bcrypt.hash(generate, 10, async (err, hashed) => {
                user.password = hashed;
                await user.save();

                const mailOptions = {
                    from: 'patriotdiscord1107@gmail.com',
                    to: email,
                    subject: `Your new Password`,
                    html: `<p>Hello ${user.username}🤗 seems you have forgot your password, try the new password <b>${generate}</b></p>`
                };

                await emailTransporter.sendMail(mailOptions);
                res.json({ message: "Your verification code has sended" });
            })

        });

    } catch (error) {
        console.log(error);
    }


}

export const changepassword = async (req, res) => {
    // compare old password and set the new password
    const { oldpassword, newPassword } = req.body;

    const user = await Users.findOne({
        _id: req.user
    });

    if (!user) return res.status(403).json({ message: "Cant find any users" });

 
    bcrypt.compare(oldpassword, user.password, function(err, result) {
        if(err) return res.status(502).json({message : "Internal server error"});
        if(!result) return res.status(403).json({ message: "Your old password dint match any." });


        bcrypt.hash(newPassword, 10, async (err, hash) => {
            if(err) return res.status(502).json({message : 'Internal server error'});
            user.password = hash;
            await user.save();
            return res.json({ message: "Your password updated" });
        })

    });

    

}

export const setInformationUser = async (req, res) => {
    try {
        const { age, gender, weight, height, profileImage, daily_activity } = req.body;
        const user = await Users.findById(req.params.userId);
        if (!user) return res.status(403).json({ message: "The credentials doesnt valid" });

        if(!age || !gender || !weight || !height ){
            return res.status(403).json({ message: "The Form value is not valid" });
        }

        user.age = age;
        user.gender = gender;
        user.weight = weight;
        user.height = height;
        user.profileImage = profileImage;
        user.daily_activity = daily_activity;

        // Kebutuhan kalori harian bisa dihitung menggunakan rumus Basal Metabolic Rate (BMR) dan faktor Total Daily Energy Expenditure (TDEE).

        let BMR;
        if(gender == "lakilaki"){
            BMR=88.362 + (13.397 * weight)+(4.799 * height) - (5.677 * age);
        }else{
            BMR=447.593+(9.247 * weight)+(3.098 * height) - (4.330 * age)
        }

        //Cek daily_activity  level
        if(daily_activity == "level1"){
            BMR = BMR * 1.2;
        }
        if(daily_activity == "level2"){
            BMR = BMR * 1.375;
        }
        if(daily_activity == "level3"){
            BMR = BMR * 1.55;
            
        }
        if(daily_activity == "level4"){
            BMR = BMR * 1.725;
            
        }
        if(daily_activity == "level5"){
            BMR = BMR * 1.9;
        }

        user.daily_caloric_goal = BMR;
        //Asupan air=berat badan dalam kg×30 ml atau berat badan dalam kg×35 ml
        user.daily_water_goal = weight * 35; 
     
        await user.save();
        res.json({message : "Your information is succesfully saved."});

    } catch (error) {
        console.log(error);
    }


} 

export const authWithBarcode = async (req, res) => {
    try {
        // console.log('hit qrcode api..');
        const {e} = req.body;

        const user = await Users.findOne({email : cryptr.decrypt(e)});
        if(!user) return res.status(403).json({message : "Barcode is not valid"});
    
        res.json({message : 'ok', user});
    } catch (error) {
        console.log({error})
    }
   
}

export const getDetailUser = async(req, res) => {
    try {
        const user = await Users.findById(req.user.id);
        res.json({message : 'oke', user});
    } catch (error) {
        console.log({error})
    }
}

export const isAuthUser = async(req, res, next) => {
    let id = req.header('token');
    console.log({id})

    if(!id) return res.status(403).json({message : "Unauthorized."});

    req.user = id;
    next(); 
}

export const updateUser = async (req, res) => {
    try{
        const {username, weight, height, daily_activity, gender, age} = req.body;
        const user = await Users.findById(req.user);

        if(!user) return res.status(403).json({message : "User is invalid"});

        if(!age || !gender || !weight || !height ){
            return res.status(403).json({ message: "The Form value is not valid" });
        }

        username.username;
        user.age = age;
        user.gender = gender;
        user.weight = weight;
        user.height = height;
        user.daily_activity = daily_activity;

        let BMR;
        if(gender == "lakilaki"){
            BMR=88.362 + (13.397 * weight)+(4.799 * height) - (5.677 * age);
        }else{
            BMR=447.593+(9.247 * weight)+(3.098 * height) - (4.330 * age)
        }

        //Cek daily_activity  level
        if(daily_activity == "level1"){
            BMR = BMR * 1.2;
        }
        if(daily_activity == "level2"){
            BMR = BMR * 1.375;
        }
        if(daily_activity == "level3"){
            BMR = BMR * 1.55;
            
        }
        if(daily_activity == "level4"){
            BMR = BMR * 1.725;
            
        }
        if(daily_activity == "level5"){
            BMR = BMR * 1.9;
        }

        user.daily_caloric_goal = BMR;
        //Asupan air=berat badan dalam kg×30 ml atau berat badan dalam kg×35 ml
        user.daily_water_goal = weight * 35; 
     
        await user.save();
        res.json({message : "Profilemu sudah diperbaharui. kamu harus login ulang"});
    }catch(err){
        console.log({err})
    }
}