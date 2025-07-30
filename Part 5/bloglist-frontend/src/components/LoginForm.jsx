


const LoginForm = ({ handleLogin, username, password }) => {
  const { reset: resetUsername, ...usernameProps } = username
  const { reset: resetPassword, ...passwordProps } = password

  return (
    <div className='border-2 flex flex-col h-4/10 justify-center'>
      <h2 className='m-8 text-3xl'>log in to application</h2>
      <form onSubmit={handleLogin} className='flex flex-col h-4/10 justify-between'>
        <div className='flex flex-row justify-center items-center m-auto gap-2'>
          username
          <input className='border-2 border-black rounded-lg px-3' {...usernameProps} />
        </div>
        <div className=' flex flex-row justify-center items-center m-auto gap-2'>
          password
          <input className='border-2 border-black rounded-lg px-3' {...passwordProps} />
        </div>
        <button className='border-1 bg-emerald-300 w-4/10 rounded-2xl m-auto' type="submit">login</button>
      </form>
    </div>
    )

}


export default LoginForm