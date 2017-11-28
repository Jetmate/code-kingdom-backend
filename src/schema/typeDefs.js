export default [`
  type DeleteResult {
    acknowledged: Boolean!
    deletedCount: Int!
  }

  `, `
  type User {
    _id: ID!
    username: String!
    bio: String
    courses: [CourseInfo]!
  }

  type CourseInfo {
    course: Course!
    type: CourseStatus!
  }

  enum CourseStatus {
    ACTIVE
    COMPLETED
    CREATED
  }


  type Query {
    users: [User]!
    user(id: ID!): User!
    userCourses(id: ID!, status: [CourseStatus]!): [Course]!
  }


  input createUserInput {
    username: String!
  }

  input editUserInput {
    username: String
    bio: String
  }

  type Mutation {
    createUser(input: createUserInput!): User!
    editUser(input: editUserInput!): User!
  }

  `, `
  type Course {
    _id: ID!
    title: String!
    lessons: [Lesson]!
    language: Language!
    creator: User!
  }

  enum Language {
    PYTHON
  }


  extend type Query {
    courses: [Course]!
    course(id: ID!): Course!
    titleCourse(title: String!): Course!
  }


  input createCourseInput {
    title: String!
    language: Language!
  }

  input editCourseInput {
    title: String
  }

  extend type Mutation {
    createCourse(input: createCourseInput!): Course!
    editCourse(id: ID!, input: editCourseInput!): Course!
    deleteCourse(id: ID!): DeleteResult!
  }

  `, `
  type Lesson {
    _id: ID!
    title: String!
    slides: [Slide]!
  }


  extend type Query {
    lessons(course: ID!): [Lesson]!
    lesson(id: ID!, course: ID!): Lesson!
  }


  input createLessonInput {
    title: String!
  }

  input editLessonInput {
    title: String
  }

  extend type Mutation {
    createLesson(course: ID!, input: createLessonInput!): Lesson!
    editLesson(id: ID!, course: ID!, input: editLessonInput!): Lesson!
    deleteLesson(id: ID!, course: ID!): DeleteResult!
  }

  `, `
  interface Slide {
    _id: ID!
    title: String!
  }


  extend type Query {
    slides(lesson: ID!, course: ID!): [Slide]!
    slide(id: ID!, lesson: ID!, course: ID!): Slide!
  }


  extend type Mutation {
    deleteSlide(id: ID!, lesson: ID!, course: ID!): DeleteResult!
  }

  `, `
  type Quiz implements Slide {
    _id: ID!
    title: String!
    questions: [Question!]!
  }

  type Question {
    title: String!
    answers: [Answer!]!
  }

  type Answer {
    title: String!
    correct: Boolean!
  }


  input createQuizSlideInput {
    title: String!
    questions: [questionInput!]!
  }

  input editQuizSlideInput {
    title: String
    questions: [questionInput]
  }

  input questionInput {
    title: String!
    answers: [answerInput!]!
  }

  input answerInput {
    title: String!
    correct: Boolean!
  }

  extend type Mutation {
    createQuizSlide(id: ID!, lesson: ID!, course: ID!, input: createQuizSlideInput!): Slide!
    editQuizSlide(id: ID!, lesson: ID!, course: ID!, input: editQuizSlideInput!): Slide!
  }

  `, `
  type Instruction implements Slide {
    _id: ID!
    title: String!
    description: String!
    hint: String!
    code: String!
    correctOutput: [String!]!
  }

  input createInstructionSlideInput {
    title: String!
    description: String!
    hint: String!
    code: String!
    correctOutput: [String!]!
  }

  input editInstructionSlideInput {
    title: String
    description: String
    hint: String
    code: String
    correctOutput: [String]
  }

  extend type Mutation {
    createInstructionSlide(lesson: ID!, course: ID!, input: createInstructionSlideInput!): Slide!
    editInstructionSlide(id: ID!, lesson: ID!, course: ID!, input: editInstructionSlideInput!): Slide!
  }

  `, `
  type Project implements Slide {
    _id: ID!
    title: String!
    description: String!
    code: String!
  }

  input createProjectSlideInput {
    title: String!
    description: String!
    code: String!
  }

  input editProjectSlideInput {
    title: String
    description: String
    code: String
  }

  extend type Mutation {
    createProjectSlide(lesson: ID!, course: ID!, input: createProjectSlideInput!): Slide!
    editProjectSlide(id: ID!, lesson: ID!, course: ID!, input: editProjectSlideInput!): Slide!
  }
`]
