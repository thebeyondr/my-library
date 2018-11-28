const app = require('fastify')({
  logger: {
    prettyPrint: true
  }
})
require('dotenv').config()
const mongoose = require('mongoose')
const schema = require('./schema/schema')
const { graphiqlFastify, graphqlFastify } = require('fastify-graphql')

// Mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
mongoose.connection.once('open', (err) => {
  err ? app.log.error(err) : app.log.info('Connected to database')
})

// Graphql Routes
app.register(graphqlFastify, {
  prefix: '/graphql',
  graphql: {
    schema: schema
  }
})
app.register(graphiqlFastify, {
  prefix: '/graphiql',
  graphiql: {
    endpointURL: '/graphql'
  }
})

app.get('/', (req, res) => {
  res.status(200).send({ sayHello: 'Hello' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, err => {
  err ? app.log.error(err) : console.log(`Server listenting on ${PORT}`)
})
