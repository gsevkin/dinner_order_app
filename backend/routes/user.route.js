const auth = require("../middlewares/auth");
const bcrypt = require("bcrypt");
const { User, validate, generateAuthToken } = require("../DataSchemas/UserData");
const express = require("express");
const router = express.Router();

router.get("/current", auth.verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  return res.send({user: user});
});

router.post("/", async (req, res) => {
  // validate the request body first
  const { error } = validate(req.body);
  if (error) return res.status(400).send({error: error.details[0].message});

  //find an existing user
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send({error: "User already registered."});
  
  user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    isAdmin: false
  });
  
  user.password = await bcrypt.hash(user.password, 'thisismyprivatekey');
  await user.save();

  const token = generateAuthToken(user);
  return res.send({
    id: user.id,
    name: user.name,
    email: user.email,
    token: token }
  );    
    
});

router.post("/login", async (req, res) => {
  
  //find an existing user
  let user = await User.findOne({ name: req.body.name });
  if (!user)
    return res.status(400).send("username not registered.");

  //var check_password = await bcrypt.hash(user.password, 10);

  bcrypt.compare(req.body.password, user.password, function(err, response) {
    if (err){
      return res.status(400).send(err);
    }
    if (response){
      const token = generateAuthToken(user);
      return res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: token
      });  
    }
    else {
      return res.status(400).send("Wrong username or password.");
    }
  });  
});

module.exports = router;