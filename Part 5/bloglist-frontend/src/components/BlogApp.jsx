import { useRef } from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { Link, Routes, Route } from 'react-router-dom'

const BlogApp = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const blogFormRef = useRef()

  const hideBlogForm = () => {
    blogFormRef.current.toggleVisibility()
  }

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <h2 className='text-3xl font-semibold'>blog app</h2>
      <Togglable className=''buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm hideForm={hideBlogForm} user={user} />
      </Togglable>

      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <div key={blog.id} className='p-2 pl-1 border-1 mb-1 rounded-md w-full flex flex-row justify-start items-center'>
            <Link className='hover:text-blue-500' to={`/blogs/${blog.id}`}>{blog.title} {blog.author} </Link>
          </div>
        )
      }

    </div>
  )


}


export default BlogApp