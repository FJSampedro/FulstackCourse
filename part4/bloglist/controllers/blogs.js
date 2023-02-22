const blogsRouter = require("express").Router()
const jwt = require('jsonwebtoken')
const Blog = require("../models/blog")
const User = require('../models/user')


blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate('author', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  }
  catch (error) { next(error) }
})

blogsRouter.post("/", async (request, response, next) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = new Blog(request.body)
  blog.author=decodedToken.id
  const user = await User.findById(decodedToken.id)
  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }
  catch (error) { next(error) }
})


blogsRouter.delete("/:id", async (request, response, next) => {

  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      const author_id=blog.author
      const token = request.token
      const decodedToken = jwt.verify(token, process.env.SECRET)
      if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }
      if(author_id.toString()!==decodedToken.id.toString()){
        return response.status(401).json({ error: 'token invalid' })
      }
      else{
        try {
          await Blog.findByIdAndRemove(request.params.id)
          response.status(204).end()
        }
        catch (error) { next(error) }
      }
    } else {
      response.status(404).end()
    }
  }
  catch (error) { next(error) }
})


blogsRouter.put("/:id", async (request, response, next) => {

  const blog = request.body
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
  }
  catch (error) { next(error) }
})

module.exports = blogsRouter