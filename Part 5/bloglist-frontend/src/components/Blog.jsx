import { useState } from 'react'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import CommentSection from './CommentSection'

const Blog = () => {
  const id = useParams().id
  const blog = useSelector(state => state.blogs).find(blog => blog.id === id)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  const dispatch = useDispatch()

  if (!blog) {
    return <div> blog not found </div>
  }

  const blogUser = typeof blog.user === 'object' && blog.user !== null
    ? blog.user
    : users.find(u => u.id === blog.user)


  const addLike = () => {
    console.log("before liked: ", blog)
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blogUser?.id || blog.user
    }
    dispatch(likeBlog(likedBlog))
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
    }
  }

  return (
    <div className='w-full'>
      <div className='mb-2 flex flex-col gap-2'>
        <h2 className='text-3xl font-semibold'>{blog.title}</h2>
        <div className="blog-url text-blue-500 underline decoration-solid">
          <a href={blog.url}> {blog.url} </a>
        </div>
        <div className="blog-likes">
          <span className='mr-2'>{blog.likes} likes</span>
          <button className='bg-gray-300 px-3 rounded border' onClick={addLike}>like</button>
        </div>
        <div className="blog-adder">
          added by <em>{blogUser?.username}</em>
        </div>
        {(user.id === blogUser?.id || user.username === blogUser?.username) && (
          <button className='button bg-[#1e72fa] w-1/15 rounded-full' onClick={handleDelete}> remove </button>
        )}
      </div>
      <CommentSection />
    </div>
  )
}

export default Blog