import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks/useField'

const BlogForm = ({ hideForm, user}) => {
  const { reset: resetTitle, ...titleProps } = useField('text')
  const { reset: resetAuthor, ...authorProps } = useField('text')
  const { reset: resetUrl, ...urlProps } = useField('text')
  
  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: titleProps.value,
      author: authorProps.value,
      url: urlProps.value
    }
    dispatch(createBlog(newBlog, user))
    resetTitle()
    resetAuthor()
    resetUrl()
    hideForm()
  }

  return (
    <div>
      <h2 className='italic'>create new</h2>
      <form className='w-100' onSubmit={addBlog}>
        <div className='flex flex-col'>
          title:
          <input name='title' className='border-2 border-black rounded-lg px-3' {...titleProps} />
        </div>
        <div className='flex flex-col'>
          author:
          <input name='author' className='border-2 border-black rounded-lg px-3' {...authorProps} />
        </div>
        <div className='flex flex-col'>
          url:
          <input name='url' className='border-2 border-black rounded-lg px-3' {...urlProps} />
        </div>
        <button className='my-1 border-1 bg-emerald-300 rounded-2xl w-full' type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm