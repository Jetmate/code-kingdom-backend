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
    createUser: async (root, data, { mongo: { Users }, newUser }) => {
      if (!newUser) throw new Error('not a new user')
      data = { id: newUser, ...data }
      await Users.insert(data)
      return data
    },

    editUser: async (root, data, { mongo: { Users }, user }) => {
      if (!user) throw new Error('not authenticated')

      if (data.username !== undefined) {
        if (!data.username) throw new Error('please enter a username')
        if (/\s/g.test(data.username)) throw new Error('username can\'t have whitespace')
        if (data.username.length > 10) throw new Error('username can\'t exceed 10 characters')
        if (await Users.findOne({ username: data.username })) throw new Error('username taken')
      }

      if (data.bio !== undefined) {
        if (data.bio.length > 280) throw new Error('bio can\'t exceed 280 characters')
      }
      return (await Users.findOneAndUpdate({ id: user.id }, { $set: data })).value
    },

    createCourse: async (root, data, { mongo: { Courses }, user }) => {
      if (!user) throw new Error('not authenticated')

      if (!data.name) throw new Error('please enter a name')
      if (data.name.length > 120) throw new Error('name can\'t exceed 120 characters')

      await Courses.insert(data)
      return data
    },

    editCourse: async (root, data, { mongo: { Courses }, user }) => {
      if (!user) throw new Error('not authenticated')

      if (data.name !== undefined) {
        if (!data.name) throw new Error('please enter a name')
        if (data.name.length > 120) throw new Error('name can\'t exceed 120 characters')
      }

      return (await Courses.findOneAndUpdate({ id: data.id }, { $set: data })).value
    },
  },
}
