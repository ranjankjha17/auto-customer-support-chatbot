import { type InferSelectModel } from 'drizzle-orm'
import { type messages } from '@/lib/db/schema'

export type Message = InferSelectModel<typeof messages>

export interface Chat extends Record<string, any> {
  id: string
  title: string
  createdAt: Date
  userId: string
  path: string
  messages: Message[]
}