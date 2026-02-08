import { Db, MongoClient } from 'mongodb'

const connectionString = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@mongo:27017/`

const client = new MongoClient(connectionString)

let db: Db

try {
  const conn = await client.connect()
  db = conn.db('sample_training')
  console.log('Successfully connected to MongoDB')
} catch (e) {
  console.error('Failed to connect to MongoDB:', e)
  process.exit(1)
}

export { db }
