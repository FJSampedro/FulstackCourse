/* eslint-disable no-undef */
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)          //configura un test de peticion a la api integrada en app
const Blog = require("../models/blog")

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test("there are same number of blogs", async () => {
  const response = await api.get("/api/blogs")
  expect(response.body).toHaveLength(initialBlogs.length)
})

test("the id field exists", async () => {
  const response = await api.get("/api/blogs/5a422bc61b54a676234d17fc")
  expect(response.body.id).toBeDefined()
})

test("Post operation work succesfully", async () => {
  const blog={
    title: "Dummy Title",
    author: "Dummy Author",
    url: "www.dummy.com",
    likes: 2,
  }
  const postResponse = await api.post("/api/blogs").send(blog).expect(201)
  const getResponse = await api.get(`/api/blogs/${postResponse.body.id}`)
  expect(postResponse.body).toEqual(getResponse.body)
})

test("Post operation likes default to 0", async () => {
  const blog={
    title: "Dummy Title",
    author: "Dummy Author",
    url: "www.dummy.com",
  }
  const postResponse = await api.post("/api/blogs").send(blog).expect(201)
  const getResponse = await api.get(`/api/blogs/${postResponse.body.id}`)
  expect(getResponse.body.likes).toEqual(0)
})

test("Post operation fails when dont have title or url", async () => {
  const blogs=[{
    author: "Dummy Author",
    url: "www.dummy.com",
    likes: 0
  },
  {
    title: "Dummy Title",
    author: "Dummy Author",
    likes: 0
  }]
  let status = 0
  for (const blog of blogs){
    const postResponse = await api.post("/api/blogs").send(blog).expect(400)
    status= postResponse.status
  }
  expect(status).toEqual(400)
})