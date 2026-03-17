import { useEffect, useRef } from 'react'
import './ChatBox.css'

export function ChatBox({ messages }) {
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages])

  return (
    <div className="chatBox" role="log" aria-live="polite">
      {messages.map((m) => (
        <div key={m.id} className={`chatMsg ${m.role || ''}`.trim()}>
          <div className="chatMeta">{m.author}</div>
          <div className="chatText">{m.text}</div>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  )
}

