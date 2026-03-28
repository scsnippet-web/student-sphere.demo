
import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Trash2, Plus, IndianRupee } from 'lucide-react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const tags = ['Food', 'Travel', 'Study', 'Fun', 'Other']

// colors per tag - kept consistent with rest of app
const tagClr = {
  Food: '#00d4ff',
  Travel: '#8b5cf6',
  Study: '#10b981',
  Fun: '#f59e0b',
  Other: '#f43f5e',
}

export default function ExpensePage() {
  const { expenses, setExpenses } = useApp()

  const [what, setWhat] = useState('')
  const [amt, setAmt] = useState('')
  const [tag, setTag] = useState('Food')
  const [on, setOn] = useState('')
  const [err, setErr] = useState('')

  // filter: all/today/month
  const [period, setPeriod] = useState('all')

  function addExp() {
    if (!what.trim()) { setErr('what did you spend on?'); return }
    if (!amt || isNaN(Number(amt)) || Number(amt) <= 0) { setErr('enter a valid amount'); return }
    setExpenses(prev => [
      { id: Date.now(), what: what.trim(), amt: Number(amt), tag, on: on || new Date().toISOString().slice(0, 10) },
      ...prev,
    ])
    setWhat(''); setAmt(''); setOn(''); setErr('')
    // keep tag - usually same category in a session
  }

  function del(id) { setExpenses(prev => prev.filter(e => e.id !== id)) }

  const today = new Date().toISOString().slice(0, 10)
  const month = today.slice(0, 7)

  const filtered = expenses.filter(e => {
    if (period === 'today') return e.on === today
    if (period === 'month') return e.on.startsWith(month)
    return true
  })

  const total = filtered.reduce((s, e) => s + e.amt, 0)

  // group by tag for pie chart
  const byTag = {}
  filtered.forEach(e => { byTag[e.tag] = (byTag[e.tag] || 0) + e.amt })
  const pieData = Object.entries(byTag).map(([name, value]) => ({ name, value }))

  return (
    <div style={{ padding: '30px 32px', flex: 1, overflowY: 'auto', maxWidth: 1060 }}>

      {/* header */}
      <div className="fu" style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'var(--font1)', fontSize: 24, fontWeight: 800, letterSpacing: '-.3px' }}>
          Expense Tracker
        </h2>
        <p style={{ color: 'var(--txt2)', fontSize: 13, marginTop: 3 }}>track where your money's going</p>
      </div>

      {/* main layout - left list, right chart */}
      <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>

        {/* left side */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* add form */}
          <div className="fu2" style={st.card}>
            <p style={st.cardTitle}>New Expense</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              <div style={{ display: 'flex', gap: 9 }}>
                <input
                  placeholder="what was it?"
                  value={what} onChange={e => setWhat(e.target.value)}
                  style={{ ...st.inp, flex: 2 }}
                />
                <div style={{ position: 'relative', flex: 1 }}>
                  <IndianRupee size={13} color="var(--txt3)" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="number" placeholder="amount"
                    value={amt} onChange={e => setAmt(e.target.value)}
                    style={{ ...st.inp, paddingLeft: 28, width: '100%' }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 9 }}>
                <select value={tag} onChange={e => setTag(e.target.value)} style={st.sel}>
                  {tags.map(t => <option key={t}>{t}</option>)}
                </select>
                <input type="date" value={on} onChange={e => setOn(e.target.value)} style={st.inp} />
                <button onClick={addExp} style={st.addBtn}><Plus size={14} /> Add</button>
              </div>
            </div>
            {err && <p style={{ fontSize: 12, color: '#f43f5e', marginTop: 8 }}>{err}</p>}
          </div>

          {/* period toggle + total */}
          <div className="fu3" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {[
                { v: 'all', l: 'All' },
                { v: 'today', l: 'Today' },
                { v: 'month', l: 'This Month' },
              ].map(({ v, l }) => (
                <button
                  key={v}
                  onClick={() => setPeriod(v)}
                  style={{
                    padding: '5px 13px', borderRadius: 99, fontSize: 12, fontWeight: 500,
                    color: period === v ? 'var(--cyan)' : 'var(--txt2)',
                    background: period === v ? 'var(--cyan-dim)' : 'var(--card)',
                    border: period === v ? '1px solid rgba(0,212,255,.25)' : '1px solid var(--border)',
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
            <span style={{ fontFamily: 'var(--font1)', fontSize: 18, fontWeight: 800, color: '#f43f5e' }}>
              ₹{total.toLocaleString('en-IN')}
            </span>
          </div>

          {/* expense rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {filtered.length === 0
              ? <p style={{ textAlign: 'center', color: 'var(--txt3)', padding: '28px 0', fontSize: 13 }}>no expenses here 🎉</p>
              : filtered.map(e => (
                <div key={e.id} className="fi" style={{
                  display: 'flex', alignItems: 'center', gap: 11,
                  background: 'var(--card)', border: '1px solid var(--border)',
                  borderRadius: 'var(--rad)', padding: '11px 14px',
                }}>
                  {/* color dot */}
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: tagClr[e.tag] || '#888', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--txt)' }}>{e.what}</span>
                    <div style={{ display: 'flex', gap: 8, marginTop: 3 }}>
                      <span style={{ fontSize: 11, color: tagClr[e.tag], background: tagClr[e.tag] + '15', borderRadius: 5, padding: '1px 7px', fontWeight: 600 }}>
                        {e.tag}
                      </span>
                      <span style={{ fontSize: 11, color: 'var(--txt3)' }}>{e.on}</span>
                    </div>
                  </div>
                  <span style={{ fontFamily: 'var(--font1)', fontWeight: 700, fontSize: 15, color: tagClr[e.tag] || 'var(--txt)' }}>
                    ₹{e.amt}
                  </span>
                  <button onClick={() => del(e.id)} style={{ color: 'var(--txt3)', padding: 4, borderRadius: 6, display: 'flex' }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              ))
            }
          </div>
        </div>

        {/* right - pie + breakdown - sticky */}
        <div className="fu2" style={{ ...st.card, width: 260, flexShrink: 0, position: 'sticky', top: 24 }}>
          <p style={st.cardTitle}>By Category</p>
          {pieData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={78} paddingAngle={3}>
                    {pieData.map((d, i) => <Cell key={i} fill={tagClr[d.name] || '#888'} />)}
                  </Pie>
                  <Tooltip
                    formatter={v => [`₹${v}`, '']}
                    contentStyle={{ background: '#101828', border: '1px solid #1e2d42', borderRadius: 8, fontSize: 12, color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* manual legend since recharts one is meh */}
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {pieData.map(d => (
                  <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 8, borderBottom: '1px solid var(--border)' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: tagClr[d.name] || '#888', flexShrink: 0 }} />
                    <span style={{ flex: 1, fontSize: 12, color: 'var(--txt2)' }}>{d.name}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--txt)' }}>₹{d.value}</span>
                    <span style={{ fontSize: 11, color: 'var(--txt3)', width: 30, textAlign: 'right' }}>
                      {total ? Math.round(d.value / total * 100) : 0}%
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p style={{ fontSize: 13, color: 'var(--txt3)', marginTop: 12, textAlign: 'center' }}>add some expenses</p>
          )}
        </div>
      </div>
    </div>
  )
}

const st = {
  card: { background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--rad2)', padding: '18px', marginBottom: 16 },
  cardTitle: { fontFamily: 'var(--font1)', fontWeight: 700, fontSize: 13, color: 'var(--txt)', marginBottom: 12 },
  inp: { background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--rad)', padding: '8px 12px', color: 'var(--txt)', fontSize: 13, flex: 1 },
  sel: { background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--rad)', padding: '8px 11px', color: 'var(--txt)', fontSize: 13 },
  addBtn: { display: 'flex', alignItems: 'center', gap: 5, background: 'var(--cyan)', color: '#070b12', fontWeight: 700, fontSize: 13, padding: '8px 16px', borderRadius: 'var(--rad)', whiteSpace: 'nowrap' },
}
