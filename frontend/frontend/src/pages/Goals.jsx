function Goals() {
  return <div>Coming Soon</div>
}
export default Goals

import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Plus, X, Target } from 'lucide-react'

const typeColors = {
  Academic: '#00d4ff',
  Skill: '#8b5cf6',
  Personal: '#10b981',
  Health: '#f59e0b',
}

// days left helper
function daysLeft(deadline) {
  if (!deadline) return null
  const diff = Math.ceil((new Date(deadline) - new Date()) / 86400000)
  return diff
}

export default function GoalsPage() {
  const { goals, setGoals } = useApp()

  const [title, setTitle] = useState('')
  const [type, setType] = useState('Academic')
  const [deadline, setDeadline] = useState('')
  const [initPct, setInitPct] = useState(0)
  // used to show/hide the add form
  const [showForm, setShowForm] = useState(false)

  function add() {
    if (!title.trim()) return
    setGoals(prev => [...prev, {
      id: Date.now(),
      title: title.trim(),
      pct: Number(initPct),
      deadline,
      type,
    }])
    setTitle(''); setDeadline(''); setInitPct(0)
    setShowForm(false)
  }

  function remove(id) {
    setGoals(prev => prev.filter(g => g.id !== id))
  }

  function updatePct(id, val) {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, pct: Number(val) } : g))
  }

  const total = goals.length
  const done = goals.filter(g => g.pct >= 100).length
  const active = total - done

  return (
    <div style={{ padding: '30px 32px', flex: 1, overflowY: 'auto', maxWidth: 1060 }}>

      {/* header */}
      <div className="fu" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font1)', fontSize: 24, fontWeight: 800, letterSpacing: '-.3px' }}>
            Goal Tracker
          </h2>
          <p style={{ color: 'var(--txt2)', fontSize: 13, marginTop: 3 }}>
            {active} active · {done} completed
          </p>
        </div>

        {/* stats + add btn */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {[
            { label: 'Total', val: total, clr: 'var(--cyan)' },
            { label: 'Done', val: done, clr: '#10b981' },
          ].map(({ label, val, clr }) => (
            <div key={label} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--rad)', padding: '8px 16px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font1)', fontSize: 20, fontWeight: 800, color: clr }}>{val}</div>
              <div style={{ fontSize: 10, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '.3px' }}>{label}</div>
            </div>
          ))}
          <button
            onClick={() => setShowForm(prev => !prev)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: showForm ? 'var(--border2)' : 'var(--cyan)',
              color: showForm ? 'var(--txt)' : '#070b12',
              fontWeight: 700, fontSize: 13,
              padding: '9px 16px', borderRadius: 'var(--rad)',
              transition: 'all .15s',
            }}
          >
            {showForm ? <><X size={15} /> Cancel</> : <><Plus size={15} /> New Goal</>}
          </button>
        </div>
      </div>

      {/* add form - collapsible */}
      {showForm && (
        <div className="fu" style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--rad2)', padding: '18px 20px', marginBottom: 22 }}>
          <p style={{ fontFamily: 'var(--font1)', fontWeight: 700, fontSize: 13, marginBottom: 13, display: 'flex', alignItems: 'center', gap: 7 }}>
            <Target size={14} color="var(--cyan)" /> Set a new goal
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <input
              placeholder="what do you want to achieve?"
              value={title} onChange={e => setTitle(e.target.value)}
              style={{ flex: 3, minWidth: 200, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--rad)', padding: '9px 13px', color: 'var(--txt)', fontSize: 13 }}
            />
            <select
              value={type} onChange={e => setType(e.target.value)}
              style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--rad)', padding: '9px 12px', color: 'var(--txt)', fontSize: 13 }}
            >
              {Object.keys(typeColors).map(t => <option key={t}>{t}</option>)}
            </select>
            <input
              type="date" value={deadline} onChange={e => setDeadline(e.target.value)}
              style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--rad)', padding: '9px 12px', color: 'var(--txt)', fontSize: 13 }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ fontSize: 12, color: 'var(--txt3)' }}>Start at</span>
              <input
                type="number" min={0} max={100} value={initPct}
                onChange={e => setInitPct(e.target.value)}
                style={{ width: 60, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--rad)', padding: '9px 10px', color: 'var(--txt)', fontSize: 13, textAlign: 'center' }}
              />
              <span style={{ fontSize: 12, color: 'var(--txt3)' }}>%</span>
            </div>
            <button
              onClick={add}
              style={{ background: 'var(--cyan)', color: '#070b12', fontWeight: 700, fontSize: 13, padding: '9px 16px', borderRadius: 'var(--rad)' }}
            >
              Add Goal
            </button>
          </div>
        </div>
      )}

      {/* goal cards grid */}
      {goals.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--txt3)', padding: '60px 0', fontSize: 14 }}>
          no goals yet — set one! 🎯
        </p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 14 }}>
          {goals.map((g, i) => {
            const clr = typeColors[g.type] || '#00d4ff'
            const isDone = g.pct >= 100
            const dl = daysLeft(g.deadline)

            return (
              <div key={g.id} className="fu" style={{
                background: 'var(--card)', border: `1px solid ${isDone ? clr + '40' : 'var(--border)'}`,
                borderRadius: 'var(--rad2)', padding: '18px', animationDelay: `${i * 0.06}s`,
                display: 'flex', flexDirection: 'column', gap: 10,
              }}>
                {/* top row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.4px',
                    color: clr, background: clr + '18', borderRadius: 99, padding: '3px 9px',
                  }}>
                    {g.type}
                  </span>
                  <button onClick={() => remove(g.id)} style={{ color: 'var(--txt3)', padding: 2, borderRadius: 5, display: 'flex' }}>
                    <X size={14} />
                  </button>
                </div>

                {/* title */}
                <p style={{
                  fontFamily: 'var(--font1)', fontSize: 14.5, fontWeight: 700, color: 'var(--txt)',
                  lineHeight: 1.3, textDecoration: isDone ? 'line-through' : 'none', opacity: isDone ? .55 : 1,
                }}>
                  {g.title}
                </p>

                {/* progress row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ flex: 1, height: 5, background: 'var(--border2)', borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${g.pct}%`, background: clr, borderRadius: 99, transition: 'width .3s' }} />
                  </div>
                  <span style={{ fontFamily: 'var(--font1)', fontWeight: 800, fontSize: 14, color: clr, minWidth: 38, textAlign: 'right' }}>
                    {g.pct}%
                  </span>
                </div>

                {/* slider to update - simple ux */}
                <input
                  type="range" min={0} max={100} value={g.pct}
                  onChange={e => updatePct(g.id, e.target.value)}
                  style={{ width: '100%', accentColor: clr, cursor: 'pointer', height: 3 }}
                />

                {/* footer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                  {isDone
                    ? <span style={{ fontSize: 12, color: '#10b981', fontWeight: 600 }}>✅ completed!</span>
                    : dl !== null
                      ? <span style={{ fontSize: 11.5, color: dl < 7 ? '#f43f5e' : 'var(--txt3)', fontWeight: dl < 7 ? 600 : 400 }}>
                        {dl > 0 ? `${dl}d left` : dl === 0 ? '⚠ due today' : '⚠ overdue'}
                      </span>
                      : <span style={{ fontSize: 11.5, color: 'var(--txt3)' }}>no deadline</span>
                  }
                  {g.deadline && !isDone && (
                    <span style={{ fontSize: 11, color: 'var(--txt3)' }}>{g.deadline}</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
