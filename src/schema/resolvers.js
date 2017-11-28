export default {
  Query: {
    users: async (root, data, { mongo: { Users } }) => {
      return Users.find({})
    },
    user: async (root, data, { mongo: { Users } }) => {
      return Users.findOne({ _id: data.id })
    },
    userCourses: async (root, data, { mongo: { Courses, Users } }) => {
      const user = await Users.findOne({ _id: data.id })
      if (!user) throw new Error('no such user')

      return Promise.all(user.courses
        .filter(async courseStatus => data.status.includes(courseStatus.type))
        .map(async courseStatus => Courses.findOne({ _id: courseStatus.course }))
      )
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
      console.log(root)
      return Courses.findOne({ _id: root.course })
    },
  },

  Mutation: {
    createUser: async (root, data, { mongo: { Users }, newUser }) => {
      if (!newUser) throw new Error('already a user')

      const user = new Users({
        _id: newUser,
        ...data.input,
        bio: '',
        courses: [],
       })

      data.input = (await Users.insertOne(data.input)).ops[0]

      return data.input
    },

    editUser: async (root, data, { mongo: { Users }, user }) => {
      if (!user) throw new Error('not authenticated')

      if (data.input.username !== undefined) {
        checkName(data.input.username, 20, false)
        if (await Users.findOne({ username: data.input.username })) throw new Error('username taken')
      }

      if (data.input.bio !== undefined) {
        if (data.input.bio.length > 280) throw new Error('bio can\'t exceed 280 characters')
      }
      return (await Users.findOneAndUpdate({ id: user.id }, { $set: data.input })).value
    },

    createCourse: async (root, data, { mongo: { Courses, Users }, user }) => {
      if (!user) throw new Error('not authenticated')

      data.input = {
        ...data.input,
        lessons: [],
        creator: user._id,
      }

      checkName(data.input.title, 120)
      if (await Courses.findOne({ title: data.input.title })) throw new Error('name taken')

      data.input = (await Courses.insertOne(data.input)).ops[0]

      Users.updateOne({ _id: user._id }, { $push: { courses: { course: data._id, type: 'CREATED' } } })

      return data.input
    },

    editCourse: async (root, data, { mongo: { Courses }, user }) => {
      if (!user) throw new Error('not authenticated')

      if (data.input.title !== undefined) {
        checkName(data.input.title, 120)
        if (await Courses.findOne({ title: data.input.title })) throw new Error('name taken')
      }

      return (await Courses.findOneAndUpdate({ _id: data.id }, { $set: data.input })).value
    },

    deleteCourse: async (root, data, { mongo: { Courses }, user }) => {
      if (!user) throw new Error('not authenticated')

      return courses.deleteOne({ _id: data.id })
    },

    createLesson: async (root, data, { mongo: { Courses }, user }) => {
      if (!user) throw new Error('not authenticated')

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
      if (!user) throw new Error('not authenticated')

      checkName(data.input.title, 120)
      if (await Courses.findOne({ _id: data.course, lessons: { title: data.input.title } })) throw new Error('name taken')

      data = (await Courses.updateOne({ _id: data.course, 'lessons._id': data.id }, { $set: { 'lessons.$.': data } })).ops[0]

      return data
    },

    createQuizSlide: async (root, data, { mongo: { Courses }, user }) => {
      if (!user) throw new Error('not authenticated')

    },

    createInstructionSlide: async (root, data, { mongo: { Courses }, user }) => {
      if (!user) throw new Error('not authenticated')

    },

    createProjectSlide: async (root, data, { mongo: { Courses }, user }) => {
      if (!user) throw new Error('not authenticated')

    },
  },
}

function checkName (name, length, whitespace = true) {
  if (!name) throw new Error('please enter a name')
  if (name.length > 120) throw new Error(`name can't exceed ${length} characters`)
  if (!whitespace && /\s/g.test(name)) throw new Error('name can\'t have whitespace')
}
