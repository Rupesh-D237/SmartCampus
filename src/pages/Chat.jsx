import { useMemo, useState } from 'react'
import { FiHash, FiSend } from 'react-icons/fi'
import { Card } from '../components/Card.jsx'
import { ChatBox } from '../components/ChatBox.jsx'
import { demoChatChannels, demoChatMessages, demoStudent } from '../data/demoData.js'
import './Chat.css'

function cloneMessages(initialByChannel) {
  const out = {}
  for (const k of Object.keys(initialByChannel)) out[k] = [...initialByChannel[k]]
  return out
}

export function Chat() {
  const [active, setActive] = useState(demoChatChannels[0].name)
  const [text, setText] = useState('')
  const [messagesByChannel, setMessagesByChannel] = useState(() =>
    cloneMessages(demoChatMessages),
  )

  const messages = useMemo(() => messagesByChannel[active] ?? [], [active, messagesByChannel])

  function send() {
    const msg = text.trim()
    if (!msg) return
    setMessagesByChannel((prev) => {
      const next = { ...prev }
      const list = [...(next[active] ?? [])]
      list.push({ id: `${active}-${Date.now()}`, author: demoStudent.name.split(' ')[0], text: msg })
      next[active] = list
      return next
    })
    setText('')
  }

  return (
    <div>
      <h1 className="pageTitle">Chat</h1>
      <p className="pageSub">Demo channels for quick student communication.</p>

      <div className="chatLayout">
        <Card title="Channels" icon={FiHash}>
          <div className="channelList">
            {demoChatChannels.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActive(c.name)}
                className={`channelBtn ${active === c.name ? 'active' : ''}`.trim()}
              >
                #{c.name}
              </button>
            ))}
          </div>
        </Card>

        <Card title={`#${active}`} icon={FiHash}>
          <ChatBox
            messages={messages.map((m) => ({
              id: m.id,
              author: m.author,
              text: m.text,
            }))}
          />
          <div className="chatComposer">
            <input
              className="input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') send()
              }}
            />
            <button className="btn" type="button" onClick={send} aria-label="Send message">
              <FiSend />
              Send
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}

