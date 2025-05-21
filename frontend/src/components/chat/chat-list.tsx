'use client'

import { Message } from '@/types/chat'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Bot, User } from 'lucide-react'
import { memo } from 'react'

interface ChatListProps {
  messages: Message[]
}

export const ChatList = memo(({ messages }: ChatListProps) => {
  if (!messages.length) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center text-gray-500">
          Start a conversation with our AI assistant
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 px-4 py-6">
      {messages.map((message) => (
        <div
          key={message._id?.toString() || message.content}
          className={cn(
            'flex max-w-4xl gap-4',
            message.role === 'user' ? 'justify-end' : 'justify-start'
          )}
        >
          {message.role === 'assistant' && (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Bot className="h-4 w-4" />
            </div>
          )}
          <div
            className={cn(
              'flex flex-col space-y-2',
              message.role === 'user' ? 'items-end' : 'items-start'
            )}
          >
            <div
              className={cn(
                'rounded-lg px-4 py-2',
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              )}
            >
              {message.content}
            </div>
            <div className="text-xs text-muted-foreground">
              {format(new Date(message.createdAt), 'MMM d, h:mm a')}
            </div>
          </div>
          {message.role === 'user' && (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <User className="h-4 w-4" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
})

ChatList.displayName = 'ChatList'