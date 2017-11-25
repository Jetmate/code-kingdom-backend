import 'babel-polyfill'

import helmet from 'helmet'
import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import fs from 'fs'
import cors from 'cors'

import schema from './schema'
import connectMongo from './mongo-connector'

const secrets = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../client_secret.json')))

// app.set('view engine', 'html')
// app.engine('html', handlebars.__express)

// app.use(bodyParser.urlencoded({ extended: true }))

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
  app.use(cors())
  app.use(async (req, res, next) => {
    const response = await fetch(
      'https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=' + req.get('Authorization').split(' ')[1]
    )
    if (response.status !== 200) {
      res.send(401)
      return
    }
    const json = await response.json()
    req.user = json.sub
    next()
  })
  app.use('/graphql', bodyParser.json(), graphqlExpress({
    context: { mongo },
    schema,
  }))
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }))
})()
