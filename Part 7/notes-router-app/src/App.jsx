import { useState } from 'react'
import { 
  // BrowserRouter as Router,
  Routes, Route, Link,
  useNavigate, Navigate,
  useMatch
} from 'react-router-dom'

const Home = () => (
  <div> 
    <h2>TKTL notes app</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea iusto aliquid voluptatem odit totam! Hic, doloremque! Reiciendis recusandae aliquid, optio officia repellat incidunt nobis. Ex, nihil veritatis? Quia, maiores nulla mollitia ipsam quis itaque et odit nostrum numquam harum quos omnis obcaecati beatae ut quo, dolorem culpa voluptates. At, consectetur.</p>
  </div>
)

const Notes = ({notes}) => (
  <div>
    <h2>Notes</h2>
    <ul>
      {notes.map(note => 
        <li key={note.id}>
          <Link to={`/notes/${note.id}`}>{note.content}</Link>
        </li>
      )}
    </ul>
  </div>
)
const Note = ({ note }) => {
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}

const Users = () => (
  <div> <h2>Users</h2> </div>
)
const Login = (props) => {
  const navigate = useNavigate()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('mluukkai')
    navigate('/') // causes the browser to change to the 'home' page
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username: <input />
        </div>
        <div>
          password: <input type='password' />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen'
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false,
      user: 'Matti Luukkainen'
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas'
    }
  ])

  const [user, setUser] = useState(null)

  const login = (user) => {
    setUser(user)
  }

  const padding = {
    padding: 5
  }

  const match = useMatch('notes/:id')
  const note = match ? notes.find(n => n.id === Number(match.params.id)) : null

  return (
    <div>
        <div>
          {/* Link modifies the address bar */}
          <Link style={padding} to="/">home</Link> 
          <Link style={padding} to="/notes">notes</Link>
          <Link style={padding} to="/users">users</Link>
          {user 
            ? <em>{user} logged in</em>
            : <Link style={padding} to="/login">login</Link>
          }
        </div>

        {/* Routes is set up to render the FIRST component that matches the URL */}
        <Routes>
          {/* components are rendered based on the URL of the browser */}
          <Route path="/notes/:id" element={<Note note={note}/>} />
          <Route path="/notes" element={<Notes notes={notes}/>} />
          <Route path="/users" element={user ? <Users /> : <Navigate replace to ="/login"/>} />
          <Route path="/login" element={<Login onLogin={login}/>} />
          <Route path="/" element={<Home />} />
        </Routes>
      <footer>
        <br />
        <i>Note app, Department of Computer Science 2024</i>
      </footer>
    </div>
  )
}

export default App