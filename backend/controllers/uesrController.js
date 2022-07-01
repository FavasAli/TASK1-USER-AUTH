import User from "../models/userModel.js"
import asyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js"

//@desc Register a User
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, address } = req.body
  console.log("req.body.name", req.body.name)

  const existUser = await User.findOne({ email })

  if (existUser) {
    res.status(404)
    throw new Error("User already exist")
  }

  const user = await User.create({
    name,
    email,
    password,
    address,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      address: user.address,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error("Invalid user data")
  }
})

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    if (password === user.password) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        token: generateToken(user._id),
      })
    } else {
      res.status(401)
      throw new Error("Invalid password")
    }
  } else {
    res.status(401)
    throw new Error("Invalid credentials")
  }
})

export { registerUser, getUsers, login }
