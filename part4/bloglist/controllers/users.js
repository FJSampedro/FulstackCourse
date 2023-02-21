const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const usersRouter = require("express").Router()
const User = require("../models/user")

class UserSignInError extends Error {
  constructor(message) {
    super(message)
    this.name = "UserSignInError"
  }
}

usersRouter.post("/", async (request, response, next) => {
  const body = request.body

  const saltRounds = 10 //https://github.com/kelektiv/node.bcrypt.js/#a-note-on-rounds
  try {
    if (typeof body.username !== "string" || body.username.length < 3) {
      throw new UserSignInError("Username must have length 3 or greater")
    }
    if (typeof body.password !== "string" || body.password.length < 3) {
      throw new UserSignInError("Password must have length 3 or greater")
    }
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", { title: 1, url: 1, likes: 1 }) //populate sirve para realizar una consulta de union
  response.json(users)
})

module.exports = usersRouter
