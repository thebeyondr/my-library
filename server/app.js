const fastify = require('fastify')({
  logger: {
    prettyPrint: true
  }
})
require('dotenv').config()
fastify.register(require('fastify-cors'))
const PORT = process.env.PORT || 5000

// Mongoose
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
mongoose.connection.once('open', (err) => {
  err ? fastify.log.error(err) : fastify.log.info('Connected to database')
})

// GraphQL
const schema = require('./schema/schema')
const { graphiqlFastify, graphqlFastify } = require('fastify-graphql')

fastify.register(graphqlFastify, {
  prefix: '/graphql',
  graphql: {
    schema: schema
  }
})
fastify.register(graphiqlFastify, {
  prefix: '/graphiql',
  graphiql: {
    endpointURL: '/graphql'
  }
})

fastify.listen(PORT, err => {
  if (err){fastify.log.error(err)}
})
