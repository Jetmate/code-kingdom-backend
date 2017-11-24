import 'babel-polyfill'

import helmet from 'helmet'
import express from 'express'
import bodyParser from 'body-parser'
// import path from 'path'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'

import schema from './schema'
import connectMongo from './mongo-connector'

import jwt from 'express-jwt'
import jwksRsa from 'jwks-rsa'

// const WWW = path.join(__dirname, '../www')


// app.set('view engine', 'html')
// app.engine('html', handlebars.__express)
// app.set('views', WWW)

// app.use(bodyParser.urlencoded({ extended: true }))
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://code-kingdom.auth0.com/.well-known/jwks.json`
  }),

  audience: 'https://code-kingdom.auth0.com/api/v2/',
  issuer: `https://code-kingdom.auth0.com/`,
  algorithms: ['RS256'],
})


;(async () => {
  const mongo = await connectMongo()

  const app = express()
  if (process.env.NODE_ENV === 'production') {
    app.listen(3002, '127.0.0.1')
    console.log('RUNNING ON http://127.0.0.1:3002/')
  } else {
    app.listen(3000, '127.0.0.1')
    console.log('RUNNING ON http://0.0.0.0:3000/')
  }

  app.use(helmet())
  app.use('/graphql', bodyParser.json(), checkJwt, (req, res, next) => {
    console.log(req)
    return graphqlExpress({
      context: { mongo, authToken: req.user || {} },
      schema,
    })(req, res, next)
  })
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }))
})()
