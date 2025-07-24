import { useState } from 'react'
import styled from 'styled-components'
import { 
  // BrowserRouter as Router,
  Routes, Route, Link,
  useNavigate, Navigate,
  useMatch
} from 'react-router-dom'
// import { Table, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap'
import { 
  Container,
  TableContainer, Table, TableBody, TableRow, TableCell, Paper,
  TextField, Button,
  Alert,
  AppBar, Toolbar, IconButton
} from '@mui/material'

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Home = () => (
  <div> 
    <h2>TKTL notes app</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea iusto aliquid voluptatem odit totam! Hic, doloremque! Reiciendis recusandae aliquid, optio officia repellat incidunt nobis. Ex, nihil veritatis? Quia, maiores nulla mollitia ipsam quis itaque et odit nostrum numquam harum quos omnis obcaecati beatae ut quo, dolorem culpa voluptates. At, consectetur.</p>
  </div>
)

const Notes = ({notes}) => (
  <div>
    <h2>Notes</h2>
    {/* react-bootstrap */}
    {/* <Table striped>
      <tbody>
        {notes.map(note => 
          <tr key={note.id}>
            <td>
              <Link to={`/notes/${note.id}`}>{note.content}</Link>
            </td>
            <td>
              {note.user}
            </td>
          </tr>
        )}  
      </tbody>
    </Table> */}

    {/* MaterialUI */}
    <TableContainer component={Paper}>
      <Table>
          <TableBody>
            {notes.map(note => (
              <TableRow key={note.id}>
                <TableCell>
                  <Link to={`/notes/${note.id}`}>{note.content}</Link>
                </TableCell>
                <TableCell>
                  {note.user}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
      </Table>
    </TableContainer>
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
  <div>
    <h2>Users</h2>
    <ul>
      <li>Matti Luukkainen</li>
      <li>Juha Tauriainen</li>
      <li>Arto Hellas</li>
    </ul>
  </div>
  
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
      {/* react-bootstrap */}
      {/* <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>username: </Form.Label>
          <Form.Control type='text' name='username' />
        </Form.Group>
        <Form.Group>
          <Form.Label>password: </Form.Label>
          <Form.Control type='password' />
          <Button variant='primary' type="submit">login</Button>
        </Form.Group>
      </Form> */}

      {/* MaterialUI */}
      <form onSubmit={onSubmit}>
        <div>
          <TextField label="username" />
        </div>
        <div>
          <TextField label="password" type='password'/>
        </div>
        <div>
          <Button variant='contained' color='primary' type='submit'>
            login
          </Button>
        </div>
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
  const [message, setMessage] = useState(null)
  
  const match = useMatch('notes/:id')
  const note = match ? notes.find(n => n.id === Number(match.params.id)) : null
  
  const login = (user) => {
    setUser(user)
    setMessage(`welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 10000);
  }

  const padding = {
    padding: 5
  }


  return (
    // react-bootstrap framework
    // <div className='container'>
    //   {(message && 
    //     <Alert variant='success'>
    //       {message}
    //     </Alert>
    //   )}
    //     <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
    //       <Navbar.Toggle aria-controls='responsive-navbar-nav' />
    //       <Navbar.Collapse id='responsive-navbar-nav'>
    //         <Nav className='me-auto'>
    //           <Nav.Link href="#" as="span">
    //             <Link style={padding} to="/">home</Link> 
    //           </Nav.Link>
    //           <Nav.Link href="#" as="span">
    //             <Link style={padding} to="/notes">notes</Link> 
    //           </Nav.Link>
    //           <Nav.Link href="#" as="span">
    //             <Link style={padding} to="/users">users</Link> 
    //           </Nav.Link>
    //           <Nav.Link href="#" as="span">
    //             {user 
    //               ? <em style={padding}>{user} logged in</em>
    //               : <Link style={padding} to="/login">login</Link>
    //             }
    //           </Nav.Link>
    //         </Nav>
    //       </Navbar.Collapse>
    //     </Navbar>

    //     {/* Routes is set up to render the FIRST component that matches the URL */}
    //     <Routes>
    //       {/* components are rendered based on the URL of the browser */}
    //       <Route path="/notes/:id" element={<Note note={note}/>} />
    //       <Route path="/notes" element={<Notes notes={notes}/>} />
    //       <Route path="/users" element={user ? <Users /> : <Navigate replace to ="/login"/>} />
    //       <Route path="/login" element={<Login onLogin={login}/>} />
    //       <Route path="/" element={<Home />} />
    //     </Routes>
    //   <footer>
    //     <br />
    //     <i>Note app, Department of Computer Science 2024</i>
    //   </footer>
    // </div>
    
    // MaterialUI framework
    <Container>
      {(message && 
        <Alert severity='success'>
          {message}
        </Alert>
      )}
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' color="inherit" aria-label='menu'></IconButton>
          <Button color="inherit" component={Link} to='/'>
            home
          </Button>
          <Button color="inherit" component={Link} to='/notes'>
            notes
          </Button>
          <Button color="inherit" component={Link} to='/users'>
            users
          </Button>
          {user
            ? <em>{user} logged in</em>
            : <Button color='inherit' component={Link} to='/login'>
                login
              </Button>
          }
        </Toolbar>
      </AppBar>

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
    </Container>
  )
}

export default App