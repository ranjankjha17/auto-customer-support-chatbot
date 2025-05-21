import { connectToDatabase } from './db'
import { ObjectId } from 'mongodb'

export async function getConversation(conversationId: ObjectId) {
  const { db } = await connectToDatabase()
  return await db.collection('conversations').findOne({ 
    _id: conversationId 
  })
}

export async function saveMessage({
  conversationId,
  content,
  role,
  userId
}: {
  conversationId?: ObjectId
  content: string
  role: 'user' | 'assistant'
  userId: ObjectId
}) {
  const { db } = await connectToDatabase()
  
  if (!conversationId) {
    // Create new conversation
    const result = await db.collection('conversations').insertOne({
      userId,
      createdAt: new Date(),
      messages: [{
        content,
        role,
        createdAt: new Date()
      }]
    })
    return result.insertedId
  } else {
    // Add to existing conversation
    await db.collection('conversations').updateOne(
      { _id: conversationId },
      { $push: { messages: { content, role, createdAt: new Date() } } }
    )
    return conversationId
  }
}