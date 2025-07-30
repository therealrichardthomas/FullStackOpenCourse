import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'



const UserView = () => {
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  const id = useParams().id
  const user = users.find(user => user.id === id)

  if (!user) {
    return <div className='text-3xl inline-block m-auto'>user not found</div>
  }

  const userBlogs = [...blogs].filter(blog => blog.user && (blog.user.id === user.id || blog.user === user.id))

  return (
    <div className='w-full'>
      <h2 className='text-3xl font-semibold'>{user.username}</h2>
      <h3 className='italic text-xl'>added blogs</h3>
      {userBlogs.length > 0 ? (
        <ul className=''>
          {userBlogs
            .map(blog => (
              <li className='list-disc list-inside text-md ml-5' key={blog.id}>
                {blog.title}
              </li>
            ))
          }
        </ul>
      ) : (
        <div className='ml-5 text-gray-500 italic'>no blogs yet...</div>
      )
    }
    </div>
  )

}


export default UserView