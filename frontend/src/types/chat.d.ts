import { ObjectId } from 'mongodb'

export interface Message {
  _id?: ObjectId
  content: string
  role: 'user' | 'assistant'
  createdAt: Date
}

export interface Conversation {
  _id: ObjectId
  userId: ObjectId
  createdAt: Date
  messages: Message[]
}