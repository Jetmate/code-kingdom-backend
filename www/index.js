'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _mongoConnector = require('./mongo-connector');

var _mongoConnector2 = _interopRequireDefault(_mongoConnector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var secrets = JSON.parse(_fs2.default.readFileSync(_path2.default.resolve(__dirname, '../client_secret.json')))

// app.set('view engine', 'html')
// app.engine('html', handlebars.__express)

// app.use(bodyParser.urlencoded({ extended: true }))

;_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
  var mongo, app;
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _mongoConnector2.default)();

        case 2:
          mongo = _context3.sent;
          app = (0, _express2.default)();

          if (process.env.NODE_ENV === 'production') {
            app.listen(3002, '127.0.0.1');
            console.log('RUNNING ON http://127.0.0.1:3002/');
          } else {
            app.listen(3000, '127.0.0.1');
            console.log('RUNNING ON http://0.0.0.0:3000/');
          }

          app.use((0, _helmet2.default)());
          app.use((0, _cors2.default)());
          app.use('/graphql', _bodyParser2.default.json(), function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
              var response, json, user;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      req.context = {};

                      if (!req.get('Authorization')) {
                        _context.next = 18;
                        break;
                      }

                      _context.next = 4;
                      return (0, _nodeFetch2.default)('https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=' + req.get('Authorization').split(' ')[1]);

                    case 4:
                      response = _context.sent;

                      if (!(response.status !== 200)) {
                        _context.next = 8;
                        break;
                      }

                      res.sendStatus(401);
                      return _context.abrupt('return');

                    case 8:
                      _context.next = 10;
                      return response.json();

                    case 10:
                      json = _context.sent;

                      if (!(json.aud !== secrets.web.client_id || Date.now() > json.exp * 1000)) {
                        _context.next = 14;
                        break;
                      }

                      res.sendStatus(401);
                      return _context.abrupt('return');

                    case 14:
                      _context.next = 16;
                      return mongo.Users.findOne({ id: json.sub });

                    case 16:
                      user = _context.sent;

                      if (!user) {
                        req.context.newUser = json.sub;
                      } else {
                        req.context.user = user;
                      }

                    case 18:
                      next();

                    case 19:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, undefined);
            }));

            return function (_x, _x2, _x3) {
              return _ref2.apply(this, arguments);
            };
          }(), function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return (0, _apolloServerExpress.graphqlExpress)({
                        context: _extends({}, req.context, { mongo: mongo }),
                        schema: _schema2.default
                      })(req, res, next);

                    case 2:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _callee2, undefined);
            }));

            return function (_x4, _x5, _x6) {
              return _ref3.apply(this, arguments);
            };
          }());
          app.use('/graphiql', (0, _apolloServerExpress.graphiqlExpress)({
            endpointURL: '/graphql'
          }));

        case 9:
        case 'end':
          return _context3.stop();
      }
    }
  }, _callee3, undefined);
}))();