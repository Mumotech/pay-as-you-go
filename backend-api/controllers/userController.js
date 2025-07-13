const User = require("../models/User");
const asyncMiddleware = require('../middleware/async');

//@desc Registeringa new user
//@route POST /api/v1/users/register
//@access public
exports.registerUser = asyncMiddleware(async (req, res) => {
  const user = new User(req.body);
  await user.save();

  const token = user.genAuthToken();
  res
    .header("Authorization", token)
    .status(201)
    .json({ msg: "User Registered Successfully" });
})

//@desc Login in user
//@route POST /api/v1/users/login
//@access public
exports.loginUser = asyncMiddleware(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && (await user.isPasswordValid(password))) {
    const token = user.genAuthToken();
    res.status(200).json({ msg: token });
  }
  res.status(401).json({ msg: "Invalid credentials" });
})
