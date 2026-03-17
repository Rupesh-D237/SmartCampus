import './Card.css'

export function Card({ title, icon: Icon, right, children, className = '' }) {
  return (
    <section className={`card ${className}`.trim()}>
      {(title || Icon || right) && (
        <header className="cardHeader">
          <div className="cardTitleRow">
            {Icon ? (
              <span className="cardIcon" aria-hidden="true">
                <Icon />
              </span>
            ) : null}
            {title ? <h3 className="cardTitle">{title}</h3> : null}
          </div>
          {right ? <div className="cardRight">{right}</div> : null}
        </header>
      )}
      <div className="cardBody">{children}</div>
    </section>
  )
}

