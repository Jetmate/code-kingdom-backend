import { MongoClient } from 'mongodb'

const MONGO_URL = 'mongodb://localhost:27017/code-kingdom'

export default async function () {
  const db = await MongoClient.connect(MONGO_URL)
  return { Users: db.collection('users') }
}
