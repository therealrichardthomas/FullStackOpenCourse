import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs', 
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      return [...state, action.payload]
    }, 
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog)
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    },
    addCommentToBlog(state, action) {
      const { blogId, comment } = action.payload
      const blogToUpdate = state.find(b => b.id === blogId)
      if (blogToUpdate) {
        blogToUpdate.comments.push(comment)
      }
    },
    removeCommentFromBlog(state, action) {
      const { blogId, commentId } = action.payload
      const blogToUpdate = state.find(b => b.id === blogId)
      if (blogToUpdate) {
        blogToUpdate.comments = blogToUpdate.comments.filter(c => c.id !== commentId)
      }
    }
  }
})

export const { setBlogs, appendBlog, updateBlog, removeBlog, addCommentToBlog, removeCommentFromBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    try {
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
    } catch (e) {
      console.log(e.message)
    }
  }
}

export const createBlog = (blogObject) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blogObject)
      dispatch(appendBlog(newBlog))
      dispatch(showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'success')) 
    } catch (e) {
      console.log(e.message)
      dispatch(showNotification(`Could not add blog. Try again.`, 'error'))
    }
  }
}

export const likeBlog = (blogObject) => {
  return async dispatch => {
    try {
      const likedBlog = await blogService.update(blogObject.id, blogObject) 
      console.log("after liked: ", likedBlog)
      dispatch(updateBlog(likedBlog))
      dispatch(showNotification(`blog '${likedBlog.title}' by ${likedBlog.author} liked`, 'success'))
    } catch (e) {
      console.log(e.message)
      dispatch(showNotification(`Could not like ${blogObject.title}.`, 'error'))
    }
  }
}

export const deleteBlog = (blogObject) => {
  return async dispatch => {
    try {
      const id = blogObject.id
      await blogService.deleteBlog(id)
      dispatch(removeBlog(id))
      dispatch(showNotification(`Blog '${blogObject.title}' was successfully deleted`, 'success'))
    } catch (e) {
      console.log(e.message)
      dispatch(showNotification(`Could not delete ${blogObject.title}.`, 'error'))
    }
  }
}

export const commentBlog = (blogId, content) => {
  return async (dispatch) => {
    try {
      const newComment = await blogService.addComment(blogId, { content })
      dispatch(addCommentToBlog({ blogId, comment: newComment }))
      dispatch(showNotification('Comment added', 'success'))
    } catch (e) {
      console.log(e.message)
      dispatch(showNotification('Could not add comment', 'error'))
    }
      
  }
}

export const removeComment = (blogId, commentId) => {
  return async dispatch => {
    try {
      await blogService.deleteComment(blogId, commentId)
      dispatch(removeCommentFromBlog({ blogId, commentId }))
      dispatch(showNotification('comment deleted', 'success'))
    } catch (e) {
      console.log(e.message)
      dispatch(showNotification('could not delete comment', 'error'))
    }
  }
}

export default blogSlice.reducer