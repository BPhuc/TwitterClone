import { Collection, Db, MongoClient } from 'mongodb'
import Users from '~/models/schemas/User.schema'

class UserDatabase {
  private client: MongoClient
  private db: Db

  constructor() {
    this.client = new MongoClient(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@twitter.wcr6cge.mongodb.net/?retryWrites=true&w=majority`
    )
    this.db = this.client.db('twitter-dev')
  }

  async connect() {
    try {
      await this.client.connect()
      console.log('Connected to the database!!')
    } catch (error) {
      if (error === 'string') {
        throw new Error(error)
      } else {
        throw new Error('An unknown error occurred!')
      }
    }
  }

  get userDB() {
    if (!this.db) {
      throw new Error('Database is not connected!!')
    } else {
      return this.db.collection('users')
    }
  }
}

const usersCollection = new UserDatabase()
export default usersCollection
