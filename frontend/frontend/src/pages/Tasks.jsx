function Tasks() {
  return <div>Coming Soon</div>
}
export default Tasks

import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Trash2, Plus } from 'lucide-react'

// priority tag colors - moved here instead of inside render
const priColor = { high: '#f43f5e', med: '#f59e0b', low: '#10b981' }
const priLabel = { high: 'High', med: 'Medium', low: 'Low' }

export default function TodoPage() {
  const { tasks, setTasks } = useApp()

  const [input, setInput]   = useState('')
  const [pri, setPri]       = useState('med')
  const [due, setDue]       = useState('')
  const [tab, setTab]       = useState('all')   // all / pending / done

  function add() {
    const trimmed = input.trim()
    if (!trimmed) return   // just ignore if empty
    const newTask = {
      id:   Date.now(),
      text: trimmed,
      done: false,
      pri,
      due:  due || new Date().toISOString().slice(0, 10),
    }
    setTasks(prev => [newTask, ...prev])  // add to top
    setInput('')
    setDue('')
    // keep priority same for next task (usually same type)
  }

  function toggleDone(id) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  function remove(id) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const doneCnt    = tasks.filter(t => t.done).length
  const pendingCnt = tasks.length - doneCnt
  // completion pct - svg circle thing
  const pct = tasks.length ? Math.round(doneCnt / tasks.length * 100) : 0
  const circumference = 2 * Math.PI * 26  // r=26

  const visible = tasks.filter(t => {
    if (tab === 'done')    return t.done
    if (tab === 'pending') return !t.done
    return true
  })

  return (
    <div style={{ padding: '30px 32px', flex: 1, overflowY: 'auto', maxWidth: 820 }}>

      {/* header row with circular progress */}
      <div className="fu" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font1)', fontSize: 24, fontWeight: 800, letterSpacing: '-.3px' }}>To-Do List</h2>
          <p style={{ color: 'var(--txt2)', fontSize: 13, marginTop: 3 }}>
            {pendingCnt} pending · {doneCnt} done
          </p>
        </div>
        {/* little svg progress ring */}
        <div style={{ position: 'relative', width: 60, height: 60 }}>
          <svg width={60} height={60} style={{ transform: 'rotate(-90deg)' }}>
            <circle cx={30} cy={30} r={26} fill="none" stroke="var(--border2)" strokeWidth={4.5} />
            <circle
              cx={30} cy={30} r={26} fill="none"
              stroke="#00d4ff" strokeWidth={4.5}
              strokeDasharray={`${pct / 100 * circumference} ${circumference}`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dasharray .4s ease' }}
            />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'var(--font1)', fontSize: 13, fontWeight: 800, color: '#00d4ff', lineHeight: 1 }}>{pct}%</span>
          </div>
        </div>
      </div>

      {/* input area */}
      <div className="fu2" style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--rad2)', padding: '16px 18px', marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && add()}
            placeholder="what's the task?"
            style={{
              flex: 3, minWidth: 180,
              background: 'var(--bg2)', border: '1px solid var(--border)',
              borderRadius: 'var(--rad)', padding: '9px 13px',
              color: 'var(--txt)', fontSize: 13,
            }}
          />
          {/* priority picker */}
          <select
            value={pri}
            onChange={e => setPri(e.target.value)}
            style={{
              background: 'var(--bg2)', border: '1px solid var(--border)',
              borderRadius: 'var(--rad)', padding: '9px 11px',
              color: 'var(--txt)', fontSize: 13,
            }}
          >
            <option value="high">🔴 High</option>
            <option value="med">🟡 Medium</option>
            <option value="low">🟢 Low</option>
          </select>
          <input
            type="date" value={due}
            onChange={e => setDue(e.target.value)}
            style={{
              background: 'var(--bg2)', border: '1px solid var(--border)',
              borderRadius: 'var(--rad)', padding: '9px 11px',
              color: due ? 'var(--txt)' : 'var(--txt3)', fontSize: 13,
            }}
          />
          <button
            onClick={add}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: 'var(--cyan)', color: '#070b12',
              fontWeight: 700, fontSize: 13,
              padding: '9px 16px', borderRadius: 'var(--rad)',
            }}
          >
            <Plus size={15} /> Add
          </button>
        </div>
      </div>

      {/* filter tabs */}
      <div className="fu3" style={{ display: 'flex', gap: 7, marginBottom: 14 }}>
        {[
          { key: 'all',     label: `All (${tasks.length})`       },
          { key: 'pending', label: `Pending (${pendingCnt})`     },
          { key: 'done',    label: `Done (${doneCnt})`           },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              padding: '6px 15px', borderRadius: 99, fontSize: 12.5, fontWeight: 500,
              color:       tab === key ? 'var(--cyan)' : 'var(--txt2)',
              background:  tab === key ? 'var(--cyan-dim)' : 'var(--card)',
              border:      tab === key ? '1px solid rgba(0,212,255,.25)' : '1px solid var(--border)',
              transition:  'all .15s',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* task list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {visible.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--txt3)', padding: '32px 0', fontSize: 13 }}>
            {tab === 'done' ? 'nothing done yet' : 'all clear! 🎉'}
          </p>
        )}

        {visible.map(t => (
          <div
            key={t.id}
            className="fi"
            style={{
              display: 'flex', alignItems: 'center', gap: 11,
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--rad)', padding: '12px 14px',
              opacity: t.done ? .5 : 1,
              transition: 'opacity .2s',
            }}
          >
            {/* checkbox-ish toggle */}
            <button
              onClick={() => toggleDone(t.id)}
              style={{
                width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                border: `2px solid ${t.done ? '#10b981' : 'var(--border2)'}`,
                background: t.done ? '#10b981' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all .15s',
              }}
            >
              {t.done && <span style={{ fontSize: 11, color: '#070b12', fontWeight: 900, lineHeight: 1 }}>✓</span>}
            </button>

            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 13.5, color: 'var(--txt)', textDecoration: t.done ? 'line-through' : 'none', fontWeight: 500 }}>
                {t.text}
              </span>
              <div style={{ display: 'flex', gap: 8, marginTop: 4, alignItems: 'center' }}>
                <span style={{
                  fontSize: 11, fontWeight: 600, borderRadius: 5, padding: '1px 7px',
                  color: priColor[t.pri], background: priColor[t.pri] + '18',
                }}>
                  {priLabel[t.pri]}
                </span>
                {t.due && <span style={{ fontSize: 11, color: 'var(--txt3)' }}>due {t.due}</span>}
              </div>
            </div>

            <button onClick={() => remove(t.id)} style={{ color: 'var(--txt3)', padding: 4, borderRadius: 6, display: 'flex' }}>
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
