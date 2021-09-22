const express=require('express')
const app= express()
const mongoose = require('mongoose')
const country=require('./Routes/countryRoutes')
const user= require('./Routes/userRoute')



mongoose.connect('mongodb://localhost/Userdb')
                 .then((req)=>{
                     console.log("connected")
                 })
                 .catch((ex)=>{
                     console.log("failed")
                 })

const port = process.env.port||3000

app.listen(port,()=>{
    console.log(`App running on ${port} port`)
})

app.get('/',(req,res)=>{
    res.redirect('/api/country')
})

app.use(express.json())
app.use('/api/country',country)
app.use('/api/user',user)