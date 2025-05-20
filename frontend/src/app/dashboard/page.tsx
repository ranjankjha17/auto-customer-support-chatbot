'use client';
import { useState, useRef, useEffect } from 'react';
import ChatWindow from '@/components/chat/ChatWindow';
import ChatInput from '@/components/chat/ChatInput';
import { Message } from '@/types/chat';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', content: 'Hello! How can I help you today?', role: 'assistant' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async (message: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      role: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) throw new Error('Failed to get response');
      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        assistantMessage += chunk;
        
        setMessages(prev => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage.role === 'assistant') {
            return [...prev.slice(0, -1), { ...lastMessage, content: assistantMessage }];
          } else {
            return [...prev, { id: Date.now().toString(), content: assistantMessage, role: 'assistant' }];
          }
        });
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        content: 'Sorry, something went wrong. Please try again.', 
        role: 'assistant' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <ChatWindow messages={messages} isLoading={isLoading} />
      <div ref={messagesEndRef} />
      <ChatInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
}