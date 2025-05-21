import { ChatWindow } from '@/components/chat/chat-window'
import { getConversation } from '@/lib/db/chat-queries'
import { notFound } from 'next/navigation'

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const conversationId = searchParams.id as string | undefined
  const conversation = conversationId 
    ? await getConversation(conversationId)
    : null

  if (conversationId && !conversation) {
    return notFound()
  }

  return (
    <ChatWindow 
      initialMessages={conversation?.messages || []}
      conversationId={conversation?.id}
    />
  )
}