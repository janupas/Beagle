import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

export const client = new MongoClient(process.env.DATABASE_URL || '')

export const connect = () => {
  client
    .connect()
    .then((res) => {
      console.log('Database connected')
    })
    .catch((error) => console.log(error))
}

/**
 * Load only 100 latest messages from a specific room
 */
export const getSpecificRoomMessages = async (room: string) => {
  return client
    .db('beagle')
    .collection('messages')
    .find({room: room}, { limit: 100 })
    .toArray()
}

/**
 * Load all messages
 */
export const getAllMessages = async () => {
  return client
    .db('beagle')
    .collection('messages')
    .find({}, {limit: 100})
    .toArray()
}

export const addMessage = async (message: any) => {
  return client.db('beagle').collection('messages').insertOne(message)
}
