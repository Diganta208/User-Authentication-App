const express=require('express')
const router= express.Router()
const {Country,validate}= require('../Models/country')

router.get('/',async (req,res)=>{
    let countryList=await Country.find()
    if(!countryList) res.send("There is no country")
    else res.send(countryList)
})

router.post('/',async (req,res)=>{

    let {error}= validate(req.body)
    
    if(error) res.status(400).send("Please send validate data")
    let aCountry=new Country({
        countryName: req.body.countryName,
        shortName : req.body.shortName
    })
    let result=await aCountry.save()
    if(result) res.send(result)
    else res.send("error")
})

module.exports=router



