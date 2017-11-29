export default {
  Query: {
    user: async (root, data, { mongo: { Users } }) => {
      return Users.findOne({ _id: data.id })
    },
    users: async (root, data, { mongo: { Users } }) => {
      return Users.find({})
    },

    courses: async (root, data, { mongo: { Courses } }) => {
      return Courses.find({})
    },
    course: async (root, data, { mongo: { Courses } }) => {
      return Courses.findOne({ _id: data.id })
    },
    titleCourse: async (root, data, { mongo: { Courses } }) => {
      return Courses.findOne({ title: data.title })
    },
  },

  CourseInfo: {
    course: async (root, data, { mongo: { Courses } }) => {
      return Courses.findOne({ _id: root.course })
    },
  },

  Course: {
    creator: async (root, data, { mongo: { Users } }) => {
      return Users.findOne({ _id: root.creator })
    },
  },

  Mutation: {
    createUser: async (root, data, { mongo: { Users }, newUser }) => {
      if (!newUser) throw new Error('already a user')

      const user = new Users({
        ...data.input,
        _id: newUser,
        bio: '',
        courses: [],
      })

      checkName(user.username, 20, false)
      if (await Users.count({ username: user.username })) throw new Error('username taken')

      return user.save()
    },

    editUser: async (root, data, { mongo: { Users }, user }) => {
      if (!user) throw new Error('not authorized')

      if (data.input.username !== undefined) {
        checkName(data.input.username, 20, false)
        if (await Users.count({ username: data.input.username })) throw new Error('username taken')
      }

      if (data.input.bio !== undefined) {
        checkName(data.input.io, 280, false)
      }

      return Users.updateOne({ _id: user._id }, { $set: data.input })
    },

    deleteUser: async (root, data, { mongo: { Users }, debug, user }) => {
      if (!debug) throw new Error('not authorized')
      return (await Users.deleteOne({ _id: user.id })).result
    },

    createCourse: async (root, data, { mongo: { Courses, Users }, user }) => {
      if (!user) throw new Error('not authorized')

      const course = new Courses({
        ...data.input,
        creator: user._id,
        lessons: [],
      })

      checkName(course.title, 120)
      if (await Courses.count({ title: course.title })) throw new Error('name taken')

      await Users.updateOne({ _id: user._id }, { $push: { courses: { course: course._id, type: 'CREATED' } } })

      return course.save()
    },

    editCourse: async (root, data, { mongo: { Courses }, user }) => {
      if (!user) throw new Error('not authorized')

      if (data.input.title !== undefined) {
        checkName(data.input.title, 120)
        if (await Courses.findOne({ title: data.input.title })) throw new Error('name taken')
      }


      return Courses.updateOne({ _id: data.id }, { $set: data.input })
    },

    deleteCourse: async (root, data, { mongo: { Courses }, user }) => {
      if (!user) throw new Error('not authorized')

      return (await Courses.deleteOne({ _id: data.id })).result
    },

    createLesson: async (root, data, { mongo: { Courses }, user }) => {
      if (!user) throw new Error('not authorized')

      data.input = {
        ...data.input,
        slides: []
      }

      checkName(data.input.title, 120)
      if (await Courses.findOne({ _id: data.course, lessons: { title: data.input.title } })) throw new Error('name taken')

      data.input = (await Courses.updateOne({ _id: data.course }, { $push: { lessons: data.input } })).ops[0]

      return data.input
    },

    editLesson: async (root, data, { mongo: { Courses }, user }) => {
      if (!user) throw new Error('not authorized')

      checkName(data.input.title, 120)
      if (await Courses.findOne({ _id: data.course, lessons: { title: data.input.title } })) throw new Error('name taken')

      data = (await Courses.updateOne({ _id: data.course, 'lessons._id': data.id }, { $set: { 'lessons.$.': data } })).ops[0]

      return data
    },

    createQuizSlide: async (root, data, { mongo: { Courses }, user }) => {
      if (!user) throw new Error('not authorized')

    },

    createInstructionSlide: async (root, data, { mongo: { Courses }, user }) => {
      if (!user) throw new Error('not authorized')

    },

    createProjectSlide: async (root, data, { mongo: { Courses }, user }) => {
      if (!user) throw new Error('not authorized')

    },
  },
}

function checkName (name, length, whitespace = true) {
  if (!name) throw new Error('please enter a name')
  checkLength(name, length)
  if (!whitespace) checkWhitespace(name)
}

function checkWhitespace (name) {
  if (/\s/g.test(name)) throw new Error('name can\'t have whitespace')
}

function checkLength (name, length) {
  if (name.length > length) throw new Error(`name can't exceed ${length} characters`)
}
