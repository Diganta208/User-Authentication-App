
const express=require('express')
const router= express.Router()
const {User,validate}=require('../Models/User')
const {Country}= require('../Models/country')

router.get('/',async (req,res)=>{
     
    let userList= await User.find()
    if(userList) res.send(userList)
    else res.send("There is no user")
})


router.post('/',async (req,res)=>{

   const {error}= validate(req.body)
   if(error)  res.send(error)
   let aCountry=await Country.findById(req.body.countryId)
   if(!aCountry) res.send("There is no country with this id")
   let bUser= User.findOne({email: req.body.email})
   if(bUser) res.send("This email already registered")
   let aUser=new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    country:{
        countryName : aCountry.countryName,
        _id: aCountry._id
     }
    })
   let result= await aUser.save()
   if(result) res.send(result)
   else res.send("failed")
})


router.put('/',async (req,res)=>{
    
     const {error}= validate(req.body)
     if(error)  res.send(error)
     let user=await User.findById(req.body._id)
     if(!user) res.send("There is no user with this id")
     let aCountry=await Country.findById(req.body.countryId)
     if(!aCountry) res.send("There is no country with this id")
     user.userName=res.body.userName
     user.email=res.body.email
     user.password= res.body.password
     user.country.countryName=aCountry.countryName
     user.country._id=aCountry._id
     let result=await user.save()
     if(result) res.send(result)
     else res.send("failed")
})


module.exports= router