import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Menu from './components/Menu'
import LoginForm from './components/LoginForm'
import BlogApp from './components/BlogApp'
import Blog from './components/Blog'
import Users from './components/Users'
import UserView from './components/UserView'

import blogService from './services/blogs'
import loginService from './services/login'

import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, clearUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { useField } from './hooks/useField'

import {
  Routes, Route, Navigate
} from 'react-router-dom'

const App = () => {
  const username = useField('text')
  const password = useField('password')
  
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }, [dispatch])


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(showNotification(`welcome ${user.username}`, 'success'))
    } catch (exception) {
      dispatch(showNotification('wrong username or password', 'error'))
    }
  }

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      window.localStorage.removeItem('loggedBlogappUser')
      dispatch(clearUser())
      username.reset()
      password.reset()
    }
  }

  if (user === null) {
    return (
      <div className='border-2 border-red-400 w-dvw h-dvh flex flex-col items-center justify-evenly'>
        <Notification />
        <Routes>
          <Route path="/login" element={<LoginForm handleLogin={handleLogin} username={username} password={password}/>} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
      </div>
    )
  }

  return (
    <div className=''>
      <Menu handleLogout={handleLogout} />
      <div className='flex flex-col justify-content items-center w-9/10 m-auto mt-10'>
        <Notification />
        <Routes>
          <Route path="/" element={<BlogApp />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users/:id" element={<UserView />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<Navigate replace to="/" />} />
        </Routes>
      </div>
    </div>
  )
}

export default App