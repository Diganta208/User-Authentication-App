const mongoose = require('mongoose')
const Joi= require('joi')
Joi.objectid=require('joi-objectid')(Joi)

const userSchema= mongoose.Schema({
    userName: String,
    email : String,
    password: String,
    country: {
        type : new mongoose.Schema({
            countryName : String
        })
    }
})
const User= mongoose.model('User',userSchema)

function validateUser(user){
   
    const schema=Joi.object({
        _id: Joi.objectid(),
        countryId: Joi.objectid().required(),
        userName: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).max(1000)
    })

    return schema.validate(user)

}

exports.User=User
exports.validate=validateUser

