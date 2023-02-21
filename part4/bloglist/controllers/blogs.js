const blogsRouter = require("express").Router()
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
  const authors= await User.find({})
  const author=authors[0].toJSON()
  const blog = new Blog(request.body)
  blog.author=author.id
  const user = await User.findById(author.id)
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
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
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