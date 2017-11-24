"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
  Query: {
    allUsers: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(root, data, _ref2) {
        var Users = _ref2.mongo.Users;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", Users.find({}).toArray());

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function allUsers(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }()
  },
  Mutation: {
    createUser: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(root, data, _ref4) {
        var Users = _ref4.mongo.Users;
        var response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Users.insert(data);

              case 2:
                response = _context2.sent;
                return _context2.abrupt("return", Object.assign({ id: response.insertedIds[0] }, data));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      }));

      return function createUser(_x4, _x5, _x6) {
        return _ref3.apply(this, arguments);
      };
    }()
  }
};