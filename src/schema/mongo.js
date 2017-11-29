import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema

const MONGO_URL = 'mongodb://localhost:27017/code-kingdom'
mongoose.connect(MONGO_URL, { useMongoClient: true })

const User = new mongoose.Schema({
  _id: String,
  username: String,
  bio: String,
  courses: [{
    course: ObjectId,
    type: String,
  }],
}, { typeKey: false })

const Course = new mongoose.Schema({
  title: String,
  language: String,
  creator: String,
  lessons: [{
    _id: ObjectId,
    title: String,
    slides: [{
      _id: ObjectId,
      title: String,

      questions: [{
        title: String,
        answers: [{
          title: String,
          correct: Boolean,
        }],
      }],

      description: String,
      hint: String,
      code: String,
      correctOutput: [String],
    }],
  }],
}, { typeKey: false })

export default {
  Users: mongoose.model('User', User),
  Courses: mongoose.model('Course', Course)
}
