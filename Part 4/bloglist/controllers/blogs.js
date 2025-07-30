const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    ...body,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogRouter.delete('/:id', async (request, response) => {
  const user = request.user

  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() === user._id.toString()) {
    await Blog.deleteOne(blog)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'this user cannot delete this blog' })
  }

})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body // request is the updated likes

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    comments: body.comments
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
  response.json(updatedBlog)
})

blogRouter.post('/:id/comments', async (request, response) => {
  const { content } = request.body
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  const newComment = { content: content }
  blog.comments.push(newComment)

  const updatedBlog = await blog.save()

  response.status(201).json(updatedBlog.comments[updatedBlog.comments.length - 1])
})

blogRouter.delete('/:id/comments/:commentId', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const commentIdToDelete = request.params.commentId

  if (!commentIdToDelete) {
    response.status(404).json({ error: 'comment not found' })
  }

  if (blog) {
    commentIdToDelete.deleteOne()
    await blog.save()
    response.status(204).end()
  } else {
    response.status(404).send({ error: 'Blog not found' })
  }
} )

module.exports = blogRouter