import { useField } from "../hooks/useField"
import { useParams } from "react-router-dom"
import { commentBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from "../reducers/notificationReducer"

const CommentSection = () => {
  const { reset: resetComment, ...commentProps } = useField('text')
  const id = useParams().id // gets the id of the blog
  const dispatch = useDispatch()
  
  const blog = useSelector(state => state.blogs).find(blog => blog.id === id)

  const handleComment = (event) => {
    event.preventDefault()
    const content = commentProps.value
    if (content === '') {
      dispatch(showNotification('comment can not be empty', 'error'))
      return
    }
    if (content.length < 5) {
      dispatch(showNotification('comment must be more at least 5 characters long', 'error'))
      return
    }
    if(content.length > 500) {
      dispatch(showNotification('comment cannot be more than 500 characters', 'error'))
      return
    }
    dispatch(commentBlog(id, content))
    resetComment()
  }


  return (
    <div className=''>
      <h1 className='font-semibold'>comments</h1>
      <form onSubmit={handleComment}>
        <input className='border-2 border-black rounded-lg px-3 mr-2' {...commentProps} />
        <button type='submit'>add comment</button>
      </form>
      <ul>
        {blog.comments && blog.comments.length > 0 ? 
          (blog.comments.map((comment) => (
            <li className='list-disc list-inside text-md ml-5' key={comment.id || Math.random()}>{comment.content}</li>
          ))) : (
            <li className='text-md ml-5'>no comments yet.</li>
          )
        }
      </ul>
    </div>
  )
}

export default CommentSection