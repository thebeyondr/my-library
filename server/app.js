const app = require('fastify')({
  logger: {
    prettyPrint: true
  }
})
const schema = require('./schema/schema')
const { graphiqlFastify, graphqlFastify } = require('fastify-graphql')
app.register(graphqlFastify, {
  prefix: '/graphql',
  graphql: {
    schema
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
