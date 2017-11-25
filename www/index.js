'use strict';

require('babel-polyfill');

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _apolloServerExpress = require('apollo-server-express');

var _hbs = require('hbs');

var _hbs2 = _interopRequireDefault(_hbs);

var _cookieSession = require('cookie-session');

var _cookieSession2 = _interopRequireDefault(_cookieSession);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _mongoConnector = require('./mongo-connector');

var _mongoConnector2 = _interopRequireDefault(_mongoConnector);

var _googleapis = require('googleapis');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var secrets = JSON.parse(_fs2.default.readFileSync(_path2.default.resolve(__dirname, '../secrets.json')));
var oauth2Client = new _googleapis.auth.OAuth2(secrets.clientId, secrets.clientSecret, secrets.callback);

var url = oauth2Client.generateAuthUrl({
  scope: 'https://www.googleapis.com/auth/userinfo.email'
});

// app.set('view engine', 'html')
// app.engine('html', handlebars.__express)

// app.use(bodyParser.urlencoded({ extended: true }))

function authenticate(req, res, next) {
  // console.log(req.session)
  if (req.session.exp && Date.now() < JSON.parse(req.session.exp)) {
    next();
  } else {
    res.redirect('/');
  }
}

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var mongo, app, WWW;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _mongoConnector2.default)();

        case 2:
          mongo = _context.sent;
          app = (0, _express2.default)();
          WWW = void 0;

          if (process.env.NODE_ENV === 'production') {
            WWW = _path2.default.join(__dirname, '../www');
            app.listen(3002, '127.0.0.1');
            console.log('RUNNING ON http://127.0.0.1:3002/');
          } else {
            WWW = _path2.default.join(__dirname, '../../code-kingdom/www');
            app.listen(3000, '127.0.0.1');
            console.log('RUNNING ON http://0.0.0.0:3000/');
          }

          app.set('view engine', 'html');
          app.engine('html', _hbs2.default.__express);
          app.set('views', WWW);

          app.use((0, _helmet2.default)());
          app.use((0, _cookieSession2.default)({ secret: 'KV8t4Bhvq4FAIwj7' }));
          app.use('/graphql', _bodyParser2.default.json(), (0, _apolloServerExpress.graphqlExpress)({
            context: { mongo: mongo },
            schema: _schema2.default
          }));
          app.use('/graphiql', (0, _apolloServerExpress.graphiqlExpress)({
            endpointURL: '/graphql'
          }));
          app.get('/auth', function (req, res, next) {
            res.redirect(url);
          });
          app.get('/oauth2callback', function (req, res, next) {
            req.session.code = req.query.code;
            oauth2Client.getToken(req.query.code, function (err, tokens) {
              if (err) res.redirect('/');
              req.session.token = tokens.id_token;
              req.session.exp = _jsonwebtoken2.default.decode(tokens.id_token).exp;
              res.redirect('/signup');
            });
          });
          app.get(/\/(login)/, authenticate);
          app.get(/^[^.]*$/, function (req, res) {
            // console.log('render', req.session)
            // res.sendFile('index.html')
            res.render('index.html', {
              path: req.path
            });
          });
          app.use(_express2.default.static(WWW));

        case 18:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
}))();