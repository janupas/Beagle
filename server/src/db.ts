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

export const getAllMessages = async () => {
  return client.db('beagle').collection('messages').find().toArray()
}

export const addMessage = async (message: any) => {
  return client.db('beagle').collection('messages').insertOne(message)
}
