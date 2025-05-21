'use client'

import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface ChatPanelProps {
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export function ChatPanel({
  input,
  handleInputChange,
  handleSubmit
}: ChatPanelProps) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = useRef<HTMLTextAreaElement>(null)

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="relative px-2 pb-2"
    >
      <Textarea
        ref={inputRef}
        value={input}
        onChange={handleInputChange}
        onKeyDown={onKeyDown}
        placeholder="Type your message..."
        className="resize-none pr-12"
        rows={1}
      />
      <Button
        type="submit"
        size="sm"
        className={cn(
          "absolute right-4 bottom-4 h-8 w-8",
          input.trim().length === 0 && "opacity-50"
        )}
        disabled={input.trim().length === 0}
      >
        <SendIcon className="h-4 w-4" />
      </Button>
    </form>
  )
}