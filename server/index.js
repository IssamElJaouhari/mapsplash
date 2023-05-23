const express = require('express')
const mongoose = require('mongoose')
const env = require("dotenv")

const pinRoute = require("./routes/pins")
const userRoute = require("./routes/users")

const application = express()
application.use(express.json())


env.config();

mongoose.connect(process.env.CONNECTION_MONGO_STRING)
.then(()=>{
    console.log('\x1b[42m%s\x1b[0m',"SUCCESS! mongodb started!")

})
.catch((err) => 
console.log('\x1b[41m%s\x1b[0m',"FAILED, mongodb DOES NOT started !!"))

application.use("/api/pins",pinRoute)
application.use("/api/users",userRoute)

// http://localhost:3000/api/pins

application.listen(7800,()=>{
    console.log('\x1b[42m%s\x1b[0m',"Success, backend started !")
})
