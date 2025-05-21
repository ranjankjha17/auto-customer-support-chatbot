import { OpenAIStream, StreamingTextResponse } from 'ai'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { ObjectId } from 'mongodb'
import { saveMessage } from '@/lib/mongo/chat-queries'
import { validateRequest } from '@/lib/auth'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const { messages, conversationId } = await req.json()
    const { user } = await validateRequest()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Save user message
    const userId = new ObjectId(user.id)
    const convId = conversationId ? new ObjectId(conversationId) : undefined
    
    await saveMessage({
      conversationId: convId,
      content: messages[messages.length - 1].content,
      role: 'user',
      userId
    })

    // Create AI response
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages,
      stream: true,
    })

    const stream = OpenAIStream(response, {
      onCompletion: async (completion) => {
        await saveMessage({
          conversationId: convId,
          content: completion,
          role: 'assistant',
          userId
        })
      }
    })

    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error('[CHAT_ERROR]', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}