const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser=require('../middlewares/fetchuser')
const JWT_SECRET = `$9G@3d!23f4`;


// Route 1

router.post(
  "/createUser",
  body("name").isLength({ min: 3 }),
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ error: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .send("Sorry a user with this email already exists");
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      }
    } catch (error) {
      res.status(500).send("Some error occured");
    }
  }
);




//Authenticate a user
//Route 2

router.get('/login',
  body("email").isEmail(),
  body("password").exists(),
async(req,res)=>{
  let errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).send('Enter correct creds!')
  }
  const{email,password}=req.body;
  try{
    let user=await User.findOne({email});
    if(!user){
      return res.status(400).json({errors:"Email or password is incorrect"})
    }
    const passwordCompare=await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      return res.status(ison({errors:"Email or password is incorrect"}))
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({authToken})
  }catch (error) {
    res.status(500).send("Internal Server Error:Some error occured");
  }
}
)



// Route 3
// Login required

router.get('/getUser',
  fetchuser,
  async(req,res)=>{
    try {
      let userId=req.user.id;
      const user=await User.findById(userId).select('-password');
      return res.send(user);
    } catch (error) {
      res.status(500).send("Internal Server Error:Some error occured");
    }
  }
)



module.exports=router;