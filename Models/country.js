const mongoose = require('mongoose')
const Joi= require('joi')

const countrySchema= mongoose.Schema({
    countryName : String,
    shortName: String
})

const Country= mongoose.model('Country',countrySchema)

function validateCountry(country){
    const schema=Joi.object({
        countryName: Joi.string().required(),
        shortName: Joi.string().required()
    })
    return schema.validate(country);
}

exports.Country= Country
exports.validate= validateCountry


