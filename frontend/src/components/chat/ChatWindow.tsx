'use client'

import { useChat } from 'ai/react'
import { useEffect, useRef } from 'react'
import { ChatList } from './chat-list'
import { ChatPanel } from './chat-panel'
import { ChatScrollAnchor } from './chat-scroll-anchor'
import { useUIState } from 'ai/rsc'

interface ChatWindowProps {
  initialMessages: Message[]
  conversationId?: string
}

export function ChatWindow({
  initialMessages,
  conversationId
}: ChatWindowProps) {
  const [messages, setMessages] = useUIState()
  const { input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
    body: { conversationId },
    initialMessages,
    onFinish: () => {
      // Refresh conversation list
    }
  })

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-auto">
        <ChatList messages={messages} />
        <ChatScrollAnchor trackVisibility={true} />
      </div>
      <ChatPanel
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}