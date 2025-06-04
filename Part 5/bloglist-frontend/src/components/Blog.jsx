import { useState } from 'react'



const Blog = ({ blog,  updateBlog, deleteBlog, user}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteStyle = {
    backgroundColor: '#1e72fa',
    borderRadius: 3,
    color: 'black',
    border: 'none',
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10
  }

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const likedBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: likes + 1,
    user: blog.user.id,
    id: blog.id
  }

  const addLike = () => {
    setLikes(likes + 1)
    updateBlog(likedBlog)
  }

  const handleDelete = () => {
    deleteBlog(blog)
  }


  return (
    <div style = { blogStyle }>
      <div>
        <div>
          {blog.title} {blog.author} {' '}
        </div>
        <button onClick={() => setVisible(!visible)}> {visible ? 'hide' : 'view' } </button>
        {visible && (
          <div>
            <div className="blog-url">
              <a href={blog.url}> {blog.url} </a>
            </div>
            <div className="blog-likes">
              likes {blog.likes} {' '}
              <button onClick={addLike}>like</button>
            </div>
            <div className="blog-adder">
              {blog.user.username}
            </div>
            {user.username === blog.user.username && (
              <button style={deleteStyle} className="delete-btn" onClick={handleDelete}> remove </button>
            )}
          </div>
          
        )}

      </div>  
    </div>
  )
}

export default Blog