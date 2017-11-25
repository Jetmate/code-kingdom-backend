'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlTools = require('graphql-tools');

var _resolvers = require('./resolvers');

var _resolvers2 = _interopRequireDefault(_resolvers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var typeDefs = '\n  type User {\n    id: ID!\n    name: String!\n  }\n\n  type Course {\n    id: ID!\n    name: String!\n  }\n\n  type Query {\n    allUsers: [User!]!\n    User(\n      id: ID!\n    ): User\n\n    allCourses: [Course!]!\n    Course(\n      id: ID!\n    ): Course\n  }\n\n  type Mutation {\n    createUser(\n      id: ID!\n      name: String!\n    ): User\n\n    createCourse(\n      id: ID!\n      name: String!\n    ): Course\n  }\n';

exports.default = (0, _graphqlTools.makeExecutableSchema)({ typeDefs: typeDefs, resolvers: _resolvers2.default });