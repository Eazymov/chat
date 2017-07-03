const mongoose = require('mongoose')

require('dotenv').config({ path: 'variables.env' })

mongoose.connect(process.env.DATABASE)
mongoose.Promise = global.Promise
mongoose.connection.on('error', err => console.error(err.message))

require('./models/User.js')
require('./models/Message.js')

const app = require('./app.js')

app.listen(8080, () => {
  console.log('>> Listening on port 8080')
})
