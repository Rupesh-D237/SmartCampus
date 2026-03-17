import { FiRepeat } from 'react-icons/fi'
import { Card } from '../components/Card.jsx'
import { demoSkillExchange } from '../data/demoData.js'

export function SkillExchange() {
  return (
    <div>
      <h1 className="pageTitle">Skill Exchange</h1>
      <p className="pageSub">Share skills, find collaborators, and learn together.</p>

      <div className="grid two">
        {demoSkillExchange.map((s) => (
          <Card key={s.id} title={s.title} icon={FiRepeat}>
            <div className="muted" style={{ fontSize: 13 }}>
              Post type: Student collaboration
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

