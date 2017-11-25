export default {
  Query: {
    allUsers: async (root, data, { mongo: { Users } }) => {
      return Users.find({}).toArray()
    },
    User: async (root, data, { mongo: { Users } }) => {
      return Users.findOne({ id: data.id })
    },

    allCourses: async (root, data, { mongo: { Courses } }) => {
      return Courses.find({}).toArray()
    },
    Course: async (root, data, { mongo: { Courses } }) => {
      return Courses.findOne({ id: data.id })
    },
  },
  Mutation: {
    createUser: async (root, data, { mongo: { Users } }) => {
      await Users.insert(data)
      return data
    },

    createCourse: async (root, data, { mongo: { Courses } }) => {
      await Courses.insert(data)
      return data
    },
  },
}
