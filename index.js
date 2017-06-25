const mongoose = require('mongoose')

require('dotenv').config({ path: 'variables.env' })

mongoose.connect(process.env.DATABASE)
mongoose.Promise = global.Promise
mongoose.connection.on('error', err => console.error(err.message))

require('./models/user.js')

const app = require('./app.js')

app.set('port', process.env.PORT || 8080)

app.listen(app.get('port'), () => {
  console.log('>> Listening on port 8080')
})
