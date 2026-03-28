import { useState, useMemo } from 'react'
import { useApp } from '../context/AppContext'
import { Trash2, Plus, Check, X, BookOpen, ChevronDown, ChevronUp } from 'lucide-react'
const MIN_ATT = 75
const css = {
  inp: {
    flex: 1, minWidth: 180,
    background: 'var(--bg2)', border: '1px solid var(--border)',
    borderRadius: 'var(--rad)', padding: '8px 12px',
    color: 'var(--txt)', fontSize: 13,
  },
  addBtn: {
    padding: '8px 16px', background: 'var(--cyan)',
    border: 'none', borderRadius: 'var(--rad)',
    color: '#070b12', fontWeight: 700, cursor: 'pointer',
    display: 'flex', alignItems: 'center',
    gap: 6, fontSize: 13, whiteSpace: 'nowrap'
  },
  th: {
    padding: '11px 14px', textAlign: 'left',
    fontWeight: 600, color: 'var(--txt2)',
    textTransform: 'uppercase', fontSize: 11,
    letterSpacing: '.4px', whiteSpace: 'nowrap'
  }
}
export default function AttendancePage() {
  const { attendance, setAttendance, subjs, setSubjs } = useApp()
  const [newDate, setNewDate] = useState('')
  const [newSubjName, setNewSubjName] = useState('')
  const [subjErr, setSubjErr] = useState(null)
  const [showSubjPanel, setShowSubjPanel] = useState(false)

  const allDates = useMemo(
    () => [...new Set(attendance.map(a => a.date))].sort().reverse(),
    [attendance]
  )
  const subjStats = useMemo(() => subjs.map(s => {
    const records = attendance.filter(a => a.subjId === s.id)
    if (!records.length) return { ...s, present: 0, total: 0, pct: 0 }
    const presentCnt = records.filter(a => a.present).length
    return { ...s, present: presentCnt, total: records.length, pct: Math.round((presentCnt / records.length) * 100) }
  }), [attendance, subjs])
  function addSubject() {
    const name = newSubjName.trim()
    if (!name) { setSubjErr('enter a subject name'); return }
    if (subjs.some(s => s.name.toLowerCase() === name.toLowerCase())) { setSubjErr('subject already exists'); return }
    const newId = subjs.length === 0 ? 1 : Math.max(...subjs.map(s => s.id)) + 1
    setSubjs(prev => [...prev, { id: newId, name }])
    if (allDates.length > 0) {
      const maxAttId = attendance.length === 0 ? 0 : Math.max(...attendance.map(a => a.id))
      setAttendance(prev => [...prev, ...allDates.map((date, i) => ({ id: maxAttId + i + 1, date, subjId: newId, present: false }))])
    }
    setNewSubjName('')
    setSubjErr(null)
  }
  function deleteSubject(subjId) {
    setSubjs(prev => prev.filter(s => s.id !== subjId))
    setAttendance(prev => prev.filter(a => a.subjId !== subjId))
  }
  function addDate() {
    if (!newDate) return
    if (allDates.includes(newDate)) { alert('Entry for this date already exists'); return }
    const startId = attendance.length === 0 ? 1 : Math.max(...attendance.map(a => a.id)) + 1
    setAttendance(prev => [...prev, ...subjs.map((s, i) => ({ id: startId + i, date: newDate, subjId: s.id, present: true }))])
    setNewDate('')
  }
  function toggleAttendance(id) {
    setAttendance(prev => prev.map(a => a.id === id ? { ...a, present: !a.present } : a))
  }
  function deleteDate(date) {
    setAttendance(prev => prev.filter(a => a.date !== date))
  }
  const getCell = (date, subjId) => attendance.find(a => a.date === date && a.subjId === subjId)
  const getPctColor = pct => pct >= MIN_ATT ? '#10b981' : pct >= 60 ? '#f59e0b' : '#f43f5e'

  return (
    <div style={{ padding: '30px 32px', flex: 1, overflowY: 'auto', maxWidth: 1200 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'var(--font1)', fontSize: 24, fontWeight: 800, letterSpacing: '-.3px' }}>
          Attendance Tracker
        </h2>
        <p style={{ color: 'var(--txt2)', fontSize: 13, marginTop: 3 }}>
          {subjs.length} subjects · {allDates.length} days recorded
        </p>
      </div>

      <div style={{ display: 'flex', gap: 16, flexDirection: 'column' }}>

        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--rad2)', overflow: 'hidden' }}>
          <button
            onClick={() => setShowSubjPanel(p => !p)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 18px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--txt)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <BookOpen size={15} color="var(--cyan)" />
              <span style={{ fontFamily: 'var(--font1)', fontWeight: 700, fontSize: 13 }}>Manage Subjects</span>
              <span style={{ fontSize: 11, color: 'var(--txt3)', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 99, padding: '1px 8px' }}>
                {subjs.length}
              </span>
            </div>
            {showSubjPanel ? <ChevronUp size={15} color="var(--txt3)" /> : <ChevronDown size={15} color="var(--txt3)" />}
          </button>

          {showSubjPanel && (
            <div style={{ padding: '0 18px 18px' }}>
              {subjs.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
                  {subjs.map(s => (
                    <div key={s.id} style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      background: 'var(--bg2)', border: '1px solid var(--border)',
                      borderRadius: 'var(--rad)', padding: '5px 10px'
                    }}>
                      <span style={{ fontSize: 13, color: 'var(--txt)', fontWeight: 500 }}>{s.name}</span>
                      <button
                        onClick={() => deleteSubject(s.id)}
                        style={{ display: 'flex', padding: 2, color: '#f43f5e', borderRadius: 4, background: 'transparent', border: 'none', cursor: 'pointer' }}
                        title={`Remove ${s.name}`}
                      >
                        <X size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input
                  placeholder="e.g. Applied Maths-I"
                  value={newSubjName}
                  onChange={e => { setNewSubjName(e.target.value); setSubjErr(null) }}
                  onKeyDown={e => e.key === 'Enter' && addSubject()}
                  style={css.inp}
                />
                <button onClick={addSubject} style={css.addBtn}>
                  <Plus size={15} /> Add Subject
                </button>
              </div>
              {subjErr && <p style={{ fontSize: 12, color: '#f43f5e', marginTop: 6 }}>⚠ {subjErr}</p>}
              {subjs.length === 0 && (
                <p style={{ fontSize: 12, color: 'var(--txt3)', marginTop: 8 }}>
                  Add at least one subject before recording attendance.
                </p>
              )}
            </div>
          )}
        </div>

        <div style={{
          background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 'var(--rad2)', padding: '16px 18px',
          display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap'
        }}>
          <div>
            <label style={{ fontSize: 11, color: 'var(--txt2)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '.4px' }}>
              Add Entry
            </label>
            <input
              type="date"
              value={newDate}
              onChange={e => setNewDate(e.target.value)}
              style={{ ...css.inp, marginTop: 4, minWidth: 'unset' }}
            />
          </div>
          <button
            onClick={addDate}
            disabled={subjs.length === 0}
            style={{ ...css.addBtn, opacity: subjs.length === 0 ? 0.4 : 1, cursor: subjs.length === 0 ? 'not-allowed' : 'pointer' }}
          >
            <Plus size={15} /> Add Entry
          </button>
          {subjs.length === 0 && (
            <span style={{ fontSize: 12, color: 'var(--txt3)', alignSelf: 'center' }}>add subjects first ↑</span>
          )}
        </div>

        {allDates.length > 0 && subjs.length > 0 && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', minWidth: 500, borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border2)' }}>
                  <th style={css.th}>Date</th>
                  {subjs.map(s => (
                    <th key={s.id} style={{ ...css.th, textAlign: 'center', maxWidth: 90 }}>
                      {s.name.length > 12 ? s.name.slice(0, 12) + '…' : s.name}
                    </th>
                  ))}
                  <th style={{ ...css.th, width: 50 }} />
                </tr>
              </thead>
              <tbody>
                {allDates.map((date, idx) => (
                  <tr
                    key={date}
                    style={{ borderBottom: '1px solid var(--border)', background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}
                  >
                    <td style={{ padding: '11px 16px', color: 'var(--txt)', fontWeight: 500, fontFamily: 'var(--font1)', whiteSpace: 'nowrap' }}>
                      {new Date(date + 'T00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </td>
                    {subjs.map(s => {
                      const cell = getCell(date, s.id)
                      if (!cell) return <td key={s.id} style={{ padding: '10px', textAlign: 'center' }}>—</td>
                      return (
                        <td key={s.id} style={{ padding: '10px', textAlign: 'center' }}>
                          <button
                            onClick={() => toggleAttendance(cell.id)}
                            style={{
                              width: 36, height: 36, borderRadius: '50%',
                              border: 'none', cursor: 'pointer',
                              background: cell.present ? '#10b981' : 'var(--border)',
                              color: cell.present ? '#fff' : 'var(--txt3)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              margin: '0 auto', transition: 'all .15s'
                            }}
                            title={cell.present ? 'Mark absent' : 'Mark present'}
                          >
                            {cell.present ? <Check size={15} strokeWidth={3} /> : <X size={15} />}
                          </button>
                        </td>
                      )
                    })}
                    <td style={{ textAlign: 'center', padding: '10px 8px' }}>
                      <button
                        onClick={() => deleteDate(date)}
                        style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer', padding: 4, display: 'flex', margin: '0 auto' }}
                        title="Delete this date"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {allDates.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--txt2)' }}>
            <p style={{ fontSize: 14, marginBottom: 6 }}>No attendance records yet</p>
            <p style={{ fontSize: 12, color: 'var(--txt3)' }}>
              {subjs.length === 0 ? 'Start by adding subjects above' : 'Pick a date above and hit Add Entry'}
            </p>
          </div>
        )}

        {allDates.length > 0 && (
          <div>
            <h3 style={{ fontFamily: 'var(--font1)', fontSize: 15, fontWeight: 700, marginBottom: 12, color: 'var(--txt)' }}>
              Subject Summary
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
              {subjStats.map(s => {
                const clr = getPctColor(s.pct)
                return (
                  <div key={s.id} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--rad2)', padding: '14px 16px' }}>
                    <p style={{ color: 'var(--txt2)', fontSize: 11, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8, letterSpacing: '.3px' }}>
                      {s.name}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
                      <span style={{ fontFamily: 'var(--font1)', fontSize: 26, fontWeight: 800, color: clr, lineHeight: 1 }}>
                        {s.pct}%
                      </span>
                      <span style={{ color: 'var(--txt3)', fontSize: 11 }}>{s.present}/{s.total}</span>
                    </div>
                    <div style={{ background: 'var(--bg2)', borderRadius: 99, height: 5, overflow: 'hidden' }}>
                      <div style={{ height: '100%', background: clr, width: `${s.pct}%`, borderRadius: 99, transition: 'width .3s' }} />
                    </div>
                    {s.pct < MIN_ATT && s.total > 0 && (
                      <p style={{ fontSize: 11, color: '#f43f5e', marginTop: 6 }}>
                        need {Math.ceil((MIN_ATT * s.total - 100 * s.present) / (100 - MIN_ATT))} more classes
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}