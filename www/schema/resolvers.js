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
    }(),
    User: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(root, data, _ref4) {
        var Users = _ref4.mongo.Users;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", Users.findOne({ id: data.id }));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      }));

      return function User(_x4, _x5, _x6) {
        return _ref3.apply(this, arguments);
      };
    }(),

    allCourses: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(root, data, _ref6) {
        var Courses = _ref6.mongo.Courses;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", Courses.find({}).toArray());

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, undefined);
      }));

      return function allCourses(_x7, _x8, _x9) {
        return _ref5.apply(this, arguments);
      };
    }(),
    Course: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(root, data, _ref8) {
        var Courses = _ref8.mongo.Courses;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", Courses.findOne({ id: data.id }));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, undefined);
      }));

      return function Course(_x10, _x11, _x12) {
        return _ref7.apply(this, arguments);
      };
    }()
  },
  Mutation: {
    createUser: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(root, data, _ref10) {
        var Users = _ref10.mongo.Users;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return Users.insert(data);

              case 2:
                return _context5.abrupt("return", data);

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, undefined);
      }));

      return function createUser(_x13, _x14, _x15) {
        return _ref9.apply(this, arguments);
      };
    }(),

    createCourse: function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(root, data, _ref12) {
        var Courses = _ref12.mongo.Courses;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return Courses.insert(data);

              case 2:
                return _context6.abrupt("return", data);

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, undefined);
      }));

      return function createCourse(_x16, _x17, _x18) {
        return _ref11.apply(this, arguments);
      };
    }()
  }
};