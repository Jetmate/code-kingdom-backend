export default {
  Query: {
    allUsers: async (root, data, { mongo: { Users } }) => {
      return Users.find({}).toArray()
    }
  },
  Mutation: {
    createUser: async (root, data, { mongo: { Users } }) => {
      const response = await Users.insert(data)
      return Object.assign({ id: response.insertedIds[0] }, data)
    }
  },
}
