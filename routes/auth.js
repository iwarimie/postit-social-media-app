const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateRandomAvatar } =  require("../utils/randomAvatar");


//CREATE USER
router.post("/register", async (req, res) => {
   try{
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //generate random avatar
        const avatarUrl = await generateRandomAvatar(req.body.email);

        //create new password
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword, 
            profilePicture: avatarUrl,
        });

        // save user and return response
        const user = await newUser.save();
        res.status(201).json(user);
    } catch(err){
        res.status(500).json(err);
    }
});

//LOGIN
router.post("/login", async (req, res) => {
    try{
        const user = await User.findOne({email:req.body.email});
        !user && res.status(404).json("user not found");

        //check validity of password
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("wrong password")  

        //if user sends valid email and password
        res.status(200).json(user)
    }catch(err){
        res.status(500).json(err);
    }
    
})


module.exports = router;