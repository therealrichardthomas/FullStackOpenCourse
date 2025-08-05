import { useState } from 'react'
import { useMutation, useApolloClient } from '@apollo/client'
import { LOGIN } from '../queries'




const LoginForm = ({ setToken, show, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const client = useApolloClient()

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    },
    onCompleted: async (data) => {
      const token = data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)

      await client.resetStore()

      setUsername('')
      setPassword('')
      setPage('books')
    }
  })

  if (!show) {
    return null
  }

  const submit = async (e) => {
    e.preventDefault()
    login({ variables: { username, password }})
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input value={username} onChange={({target}) => setUsername(target.value)} />
        </div>
        <div>
          password <input type='password' value={password} onChange={({target}) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )


}


export default LoginForm