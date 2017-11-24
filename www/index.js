'use strict';

require('babel-polyfill');

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _apolloServerExpress = require('apollo-server-express');

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _mongoConnector = require('./mongo-connector');

var _mongoConnector2 = _interopRequireDefault(_mongoConnector);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _jwksRsa = require('jwks-rsa');

var _jwksRsa2 = _interopRequireDefault(_jwksRsa);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// import path from 'path'


// const WWW = path.join(__dirname, '../www')


// app.set('view engine', 'html')
// app.engine('html', handlebars.__express)
// app.set('views', WWW)

// app.use(bodyParser.urlencoded({ extended: true }))
var checkJwt = (0, _expressJwt2.default)({
  secret: _jwksRsa2.default.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://code-kingdom.auth0.com/.well-known/jwks.json'
  }),

  audience: 'https://code-kingdom.auth0.com/api/v2/',
  issuer: 'https://code-kingdom.auth0.com/',
  algorithms: ['RS256']
});_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var mongo, app;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _mongoConnector2.default)();

        case 2:
          mongo = _context.sent;
          app = (0, _express2.default)();

          if (process.env.NODE_ENV === 'production') {
            app.listen(3002, '127.0.0.1');
            console.log('RUNNING ON http://127.0.0.1:3002/');
          } else {
            app.listen(3000, '127.0.0.1');
            console.log('RUNNING ON http://0.0.0.0:3000/');
          }

          app.use((0, _helmet2.default)());
          app.use('/graphql', _bodyParser2.default.json(), checkJwt, function (req, res, next) {
            console.log(req);
            return (0, _apolloServerExpress.graphqlExpress)({
              context: { mongo: mongo, authToken: req.user || {} },
              schema: _schema2.default
            })(req, res, next);
          });
          app.use('/graphiql', (0, _apolloServerExpress.graphiqlExpress)({
            endpointURL: '/graphql'
          }));

        case 8:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
}))();