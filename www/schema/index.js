'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlTools = require('graphql-tools');

var _resolvers = require('./resolvers');

var _resolvers2 = _interopRequireDefault(_resolvers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var typeDefs = '\n  type User {\n    id: ID!\n    username: String!\n    bio: String\n    currentCourses: [String]!\n    completedCourses: [String]!\n    createdCourses: [String]!\n  }\n\n  type Course {\n    title: String!\n    lessons: [Lesson]!\n    language: Language!\n    creator: ID!\n  }\n\n  enum Language {\n    PYTHON\n  }\n\n  type Lesson {\n    title: String!\n    slides: [Slide!]!\n  }\n\n  interface Slide {\n    title: String!\n  }\n\n  type Quiz implements Slide {\n    title: String!\n    questions: [Question!]!\n  }\n\n  type Question {\n    title: String!\n    answers: [Answer!]!\n  }\n\n  type Answer {\n    title: String!\n    correct: Boolean!\n  }\n\n  type Instruction implements Slide {\n    title: String!\n    description: String!\n    hint: String!\n    code: String!\n    correctOutput: [String!]!\n  }\n\n  type Project implements Slide {\n    title: String!\n    description: String!\n    code: String!\n  }\n\n\n  type Query {\n    allUsers: [User]!\n    User(\n      id: ID!\n    ): User\n\n    allCourses: [Course]!\n    Course(\n      title: String!\n    ): Course\n\n    userCourses: [Course]!\n  }\n\n  type Mutation {\n    createUser(\n      username: String!\n    ): User\n\n    editUser(\n      username: String\n      bio: String\n    ): User\n\n    createCourse(\n      title: String!\n      language: Language!\n      creator: ID!\n    ): Course\n\n    editCourse(\n      title: String!\n    ): Course\n\n    createLesson(\n      courseTitle: String!\n      title: String!\n    ): Lesson\n\n    createQuizSlide(\n      courseTitle: String!\n      lessonTitle: String!\n      title: String!\n      questions: [{\n        title: String!\n        answers: [\n          {\n            title: String!\n            correct: Boolean!\n          }\n        ]\n      }]\n    ): Slide\n\n    createInstructionSlide(\n      courseTitle: String!\n      lessonTitle: String!\n      title: String!\n      description: String!\n      hint: String!\n      code: String!\n      correctOutput: [String!]!\n    ): Slide\n\n    createSlide(\n      courseTitle: String!\n      lessonTitle: String!\n      title: String!\n      description: String!\n      code: String!\n    ): Slide\n  }\n';

exports.default = (0, _graphqlTools.makeExecutableSchema)({ typeDefs: typeDefs, resolvers: _resolvers2.default });