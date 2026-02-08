import { Db, MongoClient } from 'mongodb'

const host = process.env.MONGO_HOST
const username = process.env.MONGO_USERNAME
const password = process.env.MONGO_PASSWORD
const dbName = process.env.MONGO_DB_NAME

const connectionString = `mongodb://${username}:${password}@${host}:27017/`

const client = new MongoClient(connectionString)

let db: Db | null = null

export async function connectDB() {
  try {
    const conn = await client.connect()
    db = conn.db(dbName)
    console.log('Successfully connected to MongoDB')
    return db
  } catch (e) {
    console.error('Failed to connect to MongoDB:', e)
    throw e
  }
}

export function getDB(): Db {
  if (!db) {
    throw new Error('Database not connected. Call connectDB() first.')
  }
  return db
}
