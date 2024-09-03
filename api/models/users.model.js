import mongoose from 'mongoose';

const schema = mongoose.Schema({
    username : String,
    email : {
        type : String,
        unique : true
    },
    password : String,
    daily_caloric_goal : mongoose.Types.Decimal128,
    daily_water_goal : mongoose.Types.Decimal128,
    weight : Number,
    height : Number,
    age : Number,
    gender : String,
    daily_activity : String,
    role : String,
    profileImage : String,
    isVerified : {
        type : Boolean,
        default : false
    }
});

export const Users = mongoose.model('users', schema);