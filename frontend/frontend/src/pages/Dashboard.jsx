import {useApp } from '../context/AppContext'
import {GraduationCap, CheckSquare, Wallet, CalendarCheck, TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer, PieChart, Pie } from 'recharts'
function MiniCard({ label, val, color, icon }) {
  return (
    <div style={{
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--rad2)',
      padding: '18px 20px',
      display: 'flex',
      gap: 14,
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        width: 40, height: 40,
        background: color + '1a',
        borderRadius: 'var(--rad)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: color,
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontFamily: 'var(--font1)', fontSize: 24, fontWeight: 800, color: 'var(--txt)', lineHeight: 1.1 }}>
          {val}
        </div>
        <div style={{ fontSize: 11, color: 'var(--txt2)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '.3px', fontWeight: 500 }}>
          {label}
        </div>
      </div>
      {/* accent bottom line */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: color, opacity: .4 }} />
    </div>
  )
}

const PIE_COLORS = ['#00d4ff', '#8b5cf6', '#10b981', '#f59e0b']

export default function Dashboard() {
  const { getCGPA, getAvgAtt, getSubjAttendance, totalSpend, pendingCount, subjs, tasks, goals, expenses } = useApp()

  const cgpa = getCGPA()
  const att  = getAvgAtt()

  // attendance data for chart - now from actual attendance records
  const attChartData = subjs.map(s => ({
    sub: s.name.split(' ')[0],
    att: getSubjAttendance(s.id)
  }))

  const expByTag = {}
  expenses.forEach(e => {
    expByTag[e.tag] = (expByTag[e.tag] || 0) + e.amt
  })
  const pieData = Object.keys(expByTag).map(k => ({ name: k, value: expByTag[k] }))

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long'
  })

  // not handling empty states here - dashboard always has data
  const recentTasks = tasks.slice(0, 4)

  return (
    <div style={{ padding: '30px 32px', flex: 1, overflowY: 'auto' }}>

      {/* header */}
      <div className="fu" style={{ marginBottom: 26, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font1)', fontSize: 24, fontWeight: 800, letterSpacing: '-.3px' }}>
            Hey 👋 Welcome back
          </h1>
          <p style={{ color: 'var(--txt2)', fontSize: 13, marginTop: 3 }}>{today}</p>
        </div>
        {/* little status badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'rgba(16,185,129,.1)',
          border: '1px solid rgba(16,185,129,.2)',
          borderRadius: 99, padding: '5px 12px',
        }}>
          <TrendingUp size={13} color="#10b981" />
          <span style={{ fontSize: 12, color: '#10b981', fontWeight: 600 }}>on track</span>
        </div>
      </div>

      {/* stat cards row */}
      <div className="fu2" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 22 }}>
        <MiniCard label="CGPA"           val={cgpa}          color="#00d4ff" icon={<GraduationCap size={18} />} />
        <MiniCard label="Avg Attendance" val={`${att}%`}     color="#8b5cf6" icon={<CalendarCheck size={18} />} />
        <MiniCard label="Tasks Pending"  val={pendingCount()} color="#f59e0b" icon={<CheckSquare size={18}   />} />
        <MiniCard label="Spent (Month)"  val={`₹${totalSpend()}`} color="#f43f5e" icon={<Wallet size={18}  />} />
      </div>

      {/* charts - two cols */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16, marginBottom: 20 }}>

        {/* attendance bar chart */}
        <div className="fu3" style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--rad2)', padding: 20 }}>
          <p style={{ fontFamily: 'var(--font1)', fontWeight: 700, fontSize: 13, marginBottom: 14 }}>
            Attendance per Subject
          </p>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={attChartData} barSize={30} margin={{ top: 0, right: 4, left: -22, bottom: 0 }}>
              <XAxis dataKey="sub" tick={{ fill: '#7a92b4', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: '#7a92b4', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#101828', border: '1px solid #1e2d42', borderRadius: 8, fontSize: 12 }}
                cursor={{ fill: 'rgba(255,255,255,.03)' }}
              />
              <Bar dataKey="att" radius={[5, 5, 0, 0]}>
                {attChartData.map((d, i) => (
                  <Cell key={i} fill={d.att >= 75 ? '#00d4ff' : '#f43f5e'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 6 }}>red = below 75%</p>
        </div>

        {/* spending pie */}
        <div className="fu3" style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--rad2)', padding: 20 }}>
          <p style={{ fontFamily: 'var(--font1)', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>
            Spending Breakdown
          </p>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={pieData} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3}>
                {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={v => [`₹${v}`, '']} contentStyle={{ background: '#101828', border: '1px solid #1e2d42', borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          {/* legend manually, recharts default one is ugly */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', marginTop: 8 }}>
            {pieData.map((d, i) => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: PIE_COLORS[i % PIE_COLORS.length] }} />
                <span style={{ fontSize: 11, color: 'var(--txt2)' }}>{d.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* bottom row - tasks + goals */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

        {/* tasks */}
        <div className="fu4" style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--rad2)', padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <p style={{ fontFamily: 'var(--font1)', fontWeight: 700, fontSize: 13 }}>Today's Tasks</p>
            <span style={{ fontSize: 11, background: 'var(--cyan-dim)', color: 'var(--cyan)', borderRadius: 99, padding: '2px 9px', fontWeight: 600 }}>
              {pendingCount()} left
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {recentTasks.map(t => (
              <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 9, opacity: t.done ? .45 : 1 }}>
                <div style={{
                  width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                  background: t.done ? '#10b981' : t.pri === 'high' ? '#f43f5e' : t.pri === 'med' ? '#f59e0b' : '#7a92b4'
                }} />
                <span style={{ fontSize: 13, color: 'var(--txt)', textDecoration: t.done ? 'line-through' : 'none' }}>
                  {t.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* goals progress */}
        <div className="fu4" style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--rad2)', padding: 20 }}>
          <p style={{ fontFamily: 'var(--font1)', fontWeight: 700, fontSize: 13, marginBottom: 14 }}>Goals</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {goals.map(g => {
              const clr = g.type === 'Academic' ? '#00d4ff' : g.type === 'Skill' ? '#8b5cf6' : '#10b981'
              return (
                <div key={g.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12.5, color: 'var(--txt)' }}>{g.title}</span>
                    <span style={{ fontSize: 12, color: 'var(--txt2)' }}>{g.pct}%</span>
                  </div>
                  <div style={{ height: 5, background: 'var(--border2)', borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${g.pct}%`, background: clr, borderRadius: 99, transition: 'width .5s' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
