import 'babel-polyfill'

import helmet from 'helmet'
import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import handlebars from 'hbs'
import cookieSession from 'cookie-session'
import jwt from 'jsonwebtoken'
import fs from 'fs'

import schema from './schema'
import connectMongo from './mongo-connector'

import { auth } from 'googleapis'

const secrets = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../secrets.json')))
const oauth2Client = new auth.OAuth2(
  secrets.clientId,
  secrets.clientSecret,
  secrets.callback
)

const url = oauth2Client.generateAuthUrl({
  scope: 'https://www.googleapis.com/auth/userinfo.email',
})

// app.set('view engine', 'html')
// app.engine('html', handlebars.__express)

// app.use(bodyParser.urlencoded({ extended: true }))

function authenticate (req, res, next) {
  // console.log(req.session)
  if (req.session.exp && Date.now() < JSON.parse(req.session.exp)) {
    next()
  } else {
    res.redirect('/')
  }
}

(async () => {
  const mongo = await connectMongo()

  const app = express()

  let WWW
  if (process.env.NODE_ENV === 'production') {
    WWW = path.join(__dirname, '../www')
    app.listen(3002, '127.0.0.1')
    console.log('RUNNING ON http://127.0.0.1:3002/')
  } else {
    WWW = path.join(__dirname, '../../code-kingdom/www')
    app.listen(3000, '127.0.0.1')
    console.log('RUNNING ON http://0.0.0.0:3000/')
  }

  app.set('view engine', 'html')
  app.engine('html', handlebars.__express)
  app.set('views', WWW)

  app.use(helmet())
  app.use(cookieSession({ secret: 'KV8t4Bhvq4FAIwj7' }))
  app.use('/graphql', bodyParser.json(), graphqlExpress({
    context: { mongo },
    schema,
  }))
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }))
  app.get('/auth', (req, res, next) => {
    res.redirect(url)
  })
  app.get('/oauth2callback', (req, res, next) => {
    req.session.code = req.query.code
    oauth2Client.getToken(req.query.code, function (err, tokens) {
      if (err) res.redirect('/')
      req.session.token = tokens.id_token
      req.session.exp = jwt.decode(tokens.id_token).exp
      res.redirect('/signup')
    })
  })
  app.get(/\/(login)/, authenticate)
  app.get(/^[^.]*$/, (req, res) => {
    // console.log('render', req.session)
    // res.sendFile('index.html')
    res.render('index.html', {
      path: req.path
    })
  })
  app.use(express.static(WWW))
})()
