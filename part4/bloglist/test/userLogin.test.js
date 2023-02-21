/* eslint-disable no-undef */
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app) //configura un test de peticion a la api integrada en app
const User = require("../models/user")

const initialUser = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
]

beforeEach(async () => {
  await User.deleteMany({})
})

test("Post operation work succesfully", async () => {
  const user = {
    username: "Dummy User",
    password: "DummyPassword",
  }
  const postResponse = await api.post("/api/users").send(user).expect(201)
})

test("Post operation fails when user is not correct", async () => {
  const initialUser = {
    username: "Dummy User",
    password: "DummyPassword",
  }
  const postResponse = await api.post("/api/users").send(initialUser)
  const users = [
    {
      username: "us",
      password: "DummyPassword",
    },
    {
      username: "Dummy User",
      password: "ps",
    },
    {
      name: "Repeated username",
      username: "Dummy User",
      password: "DummyPassword",
    },
  ]
  let status = 0
  for (const user of users) {
    const postResponse = await api.post("/api/users").send(user).expect(400)
    status = postResponse.status
  }
  expect(status).toEqual(400)
})
