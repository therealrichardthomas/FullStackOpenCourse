/*
  the index.js only imports the app application and then starts the application. server and app is separate.
*/

const app = require('./app') // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server is running on port ${config.PORT}`)
})
