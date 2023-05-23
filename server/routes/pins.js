const router = require("express").Router();

const Pin = require("../models/Pin");

//create a pin 📍 adn store to db🫙🫙
router.post("/", async (req, res) => {
  const pinCandidate = new Pin(req.body);

  try {
    const savedPIn = await pinCandidate.save();
    //  pinCandidate.sa// xX
    res.status(200).json(savedPIn);//succes response 🆗 200
    console.log("\x1b[42m%s\x1b[0m", "SUCCESS! pin has added to DB+"); //color the response if suucces showeed up green

  } catch (err) {
    console.log("\x1b[41m%s\x1b[0m", "FAILED! to ADDED PIN TO DB-!");//color the response if suucces showeed up red
    res.status(500).json(err)//error 500 Internal server 
  }

});

//get all pins🪃 ? 📍
router.get("/", async(req, res)=> {

    try {
        const pins = await Pin.find()
        console.log('\x1b[42m%s\x1b[0m',"SUCCESS! finding all pins!")
        res.status(200).json(pins)

    } catch (error) {
        console.log('\x1b[41m%s\x1b[0m',"FAILED! TO finding all pins!")
        res.status(500).json(err)
        
    }
})

module.exports = router