import { useMemo, useState } from 'react'
import { FiCpu, FiSend } from 'react-icons/fi'
import { Card } from '../components/Card.jsx'
import { ChatBox } from '../components/ChatBox.jsx'
import { demoAssistantSeed } from '../data/demoData.js'

function normalize(s) {
  return s.trim().toLowerCase()
}

function answerFor(question) {
  const q = normalize(question)
  if (!q) return ''

  if (q.includes('cse lab 2')) {
    return 'CSE Lab 2 is located in the Computer Science block on the second floor.'
  }
  if (q.includes('library')) {
    return 'The Library is near the main academic blocks, next to the reading hall.'
  }
  if (q.includes('innovation lab')) {
    return 'The Innovation Lab is in the campus innovation wing (near the CSE Block).'
  }
  return "I’m a demo assistant. Try asking: “Where is CSE Lab 2?”"
}

export function Assistant() {
  const [text, setText] = useState(demoAssistantSeed[0].q)
  const [messages, setMessages] = useState(() => [
    {
      id: 'seed-1',
      author: 'Assistant',
      role: 'assistant',
      text: 'Hi Sanjay! Ask me about campus locations (demo).',
    },
  ])

  const rendered = useMemo(() => messages, [messages])

  function send() {
    const q = text.trim()
    if (!q) return
    const a = answerFor(q)
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, author: 'Sanjay', text: q },
      { id: `a-${Date.now() + 1}`, author: 'Assistant', role: 'assistant', text: a },
    ])
    setText('')
  }

  return (
    <div>
      <h1 className="pageTitle">AI Campus Assistant</h1>
      <p className="pageSub">Chatbot interface (demo).</p>

      <Card title="Assistant" icon={FiCpu} right={<span className="pill">Demo</span>}>
        <ChatBox messages={rendered} />
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr auto', gap: 10 }}>
          <input
            className="input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Where is CSE Lab 2?"
            onKeyDown={(e) => {
              if (e.key === 'Enter') send()
            }}
          />
          <button className="btn" type="button" onClick={send}>
            <FiSend />
            Ask
          </button>
        </div>
      </Card>
    </div>
  )
}

