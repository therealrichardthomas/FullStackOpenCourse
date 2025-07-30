import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const Users = () => {
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  const blogsByUser = (user) => {
    const count = blogs.filter(blog => blog.user && (blog.user.id === user.id || blog.user === user.id)).length
    return count
  }

  if (!users) {
    return null
  }

  return (
    <div className='w-1/2'>
      <table className='table-fixed border-separate border-2 border-gray-400 border-spacing-1 w-full rounded'>
        <thead>
          <tr>
            <th className="border border-gray-400 text-xl rounded-xs">users</th>
            <th className="border border-gray-400 text-xl rounded-xs">blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user.id}>
                <td className="border border-gray-400 text-center align-middle rounded-xs">
                  <Link className='hover:text-blue-500' to={`/users/${user.id}`}>{user.username}</Link>
                </td>
                <td className="border border-gray-400 text-center align-middle rounded-xs">
                  {blogsByUser(user)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )

}


export default Users