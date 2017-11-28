'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
                return _context.abrupt('return', Users.find({}).toArray());

              case 1:
              case 'end':
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
                return _context2.abrupt('return', Users.findOne({ id: data.id }));

              case 1:
              case 'end':
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
                return _context3.abrupt('return', Courses.find({}).toArray());

              case 1:
              case 'end':
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
                return _context4.abrupt('return', Courses.findOne({ id: data.id }));

              case 1:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, undefined);
      }));

      return function Course(_x10, _x11, _x12) {
        return _ref7.apply(this, arguments);
      };
    }(),

    userCourses: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(root, data, _ref10) {
        var Courses = _ref10.mongo.Courses,
            user = _ref10.user;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (user) {
                  _context5.next = 2;
                  break;
                }

                throw new Error('not authenticated');

              case 2:

                console.log(user);
                return _context5.abrupt('return', user.courses.map(function (courseId) {
                  return Courses.findOne({ id: courseId });
                }));

              case 4:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, undefined);
      }));

      return function userCourses(_x13, _x14, _x15) {
        return _ref9.apply(this, arguments);
      };
    }()
  },
  Mutation: {
    createUser: function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(root, data, _ref12) {
        var Users = _ref12.mongo.Users,
            newUser = _ref12.newUser;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (newUser) {
                  _context6.next = 2;
                  break;
                }

                throw new Error('already a user');

              case 2:
                data = _extends({ id: newUser }, data, { bio: '', courses: [] });
                _context6.next = 5;
                return Users.insert(data);

              case 5:
                return _context6.abrupt('return', data);

              case 6:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, undefined);
      }));

      return function createUser(_x16, _x17, _x18) {
        return _ref11.apply(this, arguments);
      };
    }(),

    editUser: function () {
      var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(root, data, _ref14) {
        var Users = _ref14.mongo.Users,
            user = _ref14.user;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (user) {
                  _context7.next = 2;
                  break;
                }

                throw new Error('not authenticated');

              case 2:
                if (!(data.username !== undefined)) {
                  _context7.next = 13;
                  break;
                }

                if (data.username) {
                  _context7.next = 5;
                  break;
                }

                throw new Error('please enter a username');

              case 5:
                if (!/\s/g.test(data.username)) {
                  _context7.next = 7;
                  break;
                }

                throw new Error('username can\'t have whitespace');

              case 7:
                if (!(data.username.length > 10)) {
                  _context7.next = 9;
                  break;
                }

                throw new Error('username can\'t exceed 10 characters');

              case 9:
                _context7.next = 11;
                return Users.findOne({ username: data.username });

              case 11:
                if (!_context7.sent) {
                  _context7.next = 13;
                  break;
                }

                throw new Error('username taken');

              case 13:
                if (!(data.bio !== undefined)) {
                  _context7.next = 16;
                  break;
                }

                if (!(data.bio.length > 280)) {
                  _context7.next = 16;
                  break;
                }

                throw new Error('bio can\'t exceed 280 characters');

              case 16:
                _context7.next = 18;
                return Users.findOneAndUpdate({ id: user.id }, { $set: data });

              case 18:
                return _context7.abrupt('return', _context7.sent.value);

              case 19:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, undefined);
      }));

      return function editUser(_x19, _x20, _x21) {
        return _ref13.apply(this, arguments);
      };
    }(),

    createCourse: function () {
      var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(root, data, _ref16) {
        var Courses = _ref16.mongo.Courses,
            user = _ref16.user;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (user) {
                  _context8.next = 2;
                  break;
                }

                throw new Error('not authenticated');

              case 2:
                if (data.name) {
                  _context8.next = 4;
                  break;
                }

                throw new Error('please enter a name');

              case 4:
                if (!(data.name.length > 120)) {
                  _context8.next = 6;
                  break;
                }

                throw new Error('name can\'t exceed 120 characters');

              case 6:
                _context8.next = 8;
                return Courses.insert(data);

              case 8:
                return _context8.abrupt('return', data);

              case 9:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, undefined);
      }));

      return function createCourse(_x22, _x23, _x24) {
        return _ref15.apply(this, arguments);
      };
    }(),

    editCourse: function () {
      var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(root, data, _ref18) {
        var Courses = _ref18.mongo.Courses,
            user = _ref18.user;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (user) {
                  _context9.next = 2;
                  break;
                }

                throw new Error('not authenticated');

              case 2:
                if (!(data.name !== undefined)) {
                  _context9.next = 7;
                  break;
                }

                if (data.name) {
                  _context9.next = 5;
                  break;
                }

                throw new Error('please enter a name');

              case 5:
                if (!(data.name.length > 120)) {
                  _context9.next = 7;
                  break;
                }

                throw new Error('name can\'t exceed 120 characters');

              case 7:
                _context9.next = 9;
                return Courses.findOneAndUpdate({ id: data.id }, { $set: data });

              case 9:
                return _context9.abrupt('return', _context9.sent.value);

              case 10:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, undefined);
      }));

      return function editCourse(_x25, _x26, _x27) {
        return _ref17.apply(this, arguments);
      };
    }()
  }
};