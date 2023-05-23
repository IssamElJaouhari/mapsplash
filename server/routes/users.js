const router = require("express").Router();
const User = require("../models/User");

//crypt pass#️⃣ that store in DB🫙🫙

const bcrypt = require("bcrypt");

//register part ℹ️👥🖊️

router.post("/register", async (req, res) => {
  try {
    //generate password 🔑📟

    const salt = await bcrypt.genSalt(10);
    const cryptedPass = await bcrypt.hash(req.body.password, salt);

    //creating a new user (🆕👤)
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: cryptedPass,
    });

    //push user to data base
    const userSaved = await newUser.save()

    console.log("\x1b[42m%s\x1b[0m", "SUCCESS !, REGISTRATION USER✅")
    res.status(200).json(userSaved._id)

  } catch (err) {
    console.log("\x1b[41m%s\x1b[0m", "FAILED !, REGISTRATION USER🚨")
    res.status(500).json(err)
  }
})

//login part🔐🔐

router.post("/login", async (req, res) => {
  try {
    //find a specific user

    const user = await User.findOne({ userName: req.body.userName });

    if (!user) {
      console.log("\x1b[41m%s\x1b[0m", "FAILED! completed log to USER🚨");
      res.status(400).json("wrong username or password");

    } else {
      //validate password 🔑📟

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword) {

        console.log("\x1b[41m%s\x1b[0m", "FAILED! completed log to USER🚨");
        res.status(400).json("wrong username or password ❌");

      } else {

        console.log("\x1b[42m%s\x1b[0m", "success! completed log to USER✅");
        res.status(200).json(user)
      }


    }
  } catch (error) {
    console.log("\x1b[41m%s\x1b[0m", "FAILED! completed log to USER🚨");
    res.status(500).json(err)

  }
})

module.exports= router
