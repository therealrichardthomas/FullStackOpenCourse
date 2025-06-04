import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable' 
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message: null,
    type: null
  })

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (message, type) => {
    setNotification({message, type})
    setTimeout(() => {
      setNotification({message: null, type: null})
    }, 5000)
  }

  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        showNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 'success')
      })
      .catch(error => {
        console.log("ERROR SHOWN HERE: ", error);
        showNotification('Unable to create new blog', 'error')
      })
  }

  const updateBlog = (blogObject) => {
    blogService
      .update(blogObject.id, blogObject)
      .then (returnedBlog => {
        // finding and preserving the oringal user object (the server might not include the full user object)
        const ogBlog = blogs.find( b => b.id === returnedBlog.id)
        const updatedBlog = {
          ...returnedBlog,
          user: ogBlog.user
        }
        // creating a new array of the blogs with the new updated blog
        setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
        showNotification(`blog '${blogObject.title}' by ${blogObject.author} liked`, 'success')
      })
      .catch(error => {
        console.log(error)
        showNotification('unable to like blog', 'error')
      })
  }

  const deleteBlog = (blogObject) => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
      blogService
        .deleteBlog(blogObject.id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
          showNotification(`Blog '${blogObject.title}' was successfully deleted`, 'success')
        })
        .catch(error => {
          console.log(error)
          showNotification('Unable to delete blog', 'error')
        })
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showNotification('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )


  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification notification={notification} />
        {loginForm()}
      </div>
    )
  }
  
  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>


      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
        )
      }
    </div>
  )
}

export default App