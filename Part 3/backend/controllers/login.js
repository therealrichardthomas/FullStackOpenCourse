
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  // searching the user with the username attached to the request
  const user = await User.findOne({ username })
  // checking if the password is legit (can't compare passwords since passwords aren't saved)
  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

  // if either inputs are wrong, send a 401 unauthorized error
  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: 'invalid username or password' })
  }

  // creates a token for the user
  const userForToken = {
    username: user.username,
    id: user._id,
  }

  // digitally signs the token from the environment variable SECRET (only parties who knows the secret can generate tokens)
  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 }) // token expires in 1 hr

  // sends the token and username to the response body
  response
    .status(200)
    .send({ token, username: user.username, name: user.name })

})

module.exports = loginRouter