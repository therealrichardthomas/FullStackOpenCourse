import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'


const Menu = ({ handleLogout }) => {
  const padding = {
    padding: 10
  }

  const user = useSelector(state => state.user)

  return (
    <div className='bg-gray-300 p-2'>
      <Link className='p-3 hover:text-blue-500' to="/">blogs</Link>
      <Link className='p-3 hover:text-blue-500' to='/users'>users</Link>
      {user && (
        <span>
          <p className='inline-block px-5'><em>{user.username}</em> logged in</p>
          <button className='border-1 px-3 rounded hover:bg-gray-200' onClick={handleLogout}>logout</button>
        </span>
      )}
    </div>
  )


}


export default Menu