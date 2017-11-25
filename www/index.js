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

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

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

;_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  var mongo, app;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _mongoConnector2.default)();

        case 2:
          mongo = _context2.sent;
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
          app.use(function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
              var response, json;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return fetch('https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=' + req.get('Authorization').split(' ')[1]);

                    case 2:
                      response = _context.sent;

                      if (!(response.status !== 200)) {
                        _context.next = 6;
                        break;
                      }

                      res.send(401);
                      return _context.abrupt('return');

                    case 6:
                      _context.next = 8;
                      return response.json();

                    case 8:
                      json = _context.sent;

                      req.user = json.sub;
                      next();

                    case 11:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, undefined);
            }));

            return function (_x, _x2, _x3) {
              return _ref2.apply(this, arguments);
            };
          }());
          app.use('/graphql', _bodyParser2.default.json(), (0, _apolloServerExpress.graphqlExpress)({
            context: { mongo: mongo },
            schema: _schema2.default
          }));
          app.use('/graphiql', (0, _apolloServerExpress.graphiqlExpress)({
            endpointURL: '/graphql'
          }));

        case 10:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, undefined);
}))();