import { connectToDatabase } from '@/lib/mongo/db'
import { ObjectId } from 'mongodb'

export interface IUser {
  _id?: ObjectId
  email: string
  name: string
  hashedPassword: string
  createdAt: Date
  updatedAt: Date
}

export const User = {
  async findById(id: string) {
    const { db } = await connectToDatabase()
    return await db.collection<IUser>('users').findOne({
      _id: new ObjectId(id),
    })
  },
  async findByEmail(email: string) {
    const { db } = await connectToDatabase()
    return await db.collection<IUser>('users').findOne({ email })
  },
}