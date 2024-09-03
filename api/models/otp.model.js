import mongoose from 'mongoose';

const schema = mongoose.Schema({
    email : {
        type : String,
        unique : true
    },
    kode : String,
    kadaluarsa : Date
})

export const Otp = mongoose.model('otp', schema);