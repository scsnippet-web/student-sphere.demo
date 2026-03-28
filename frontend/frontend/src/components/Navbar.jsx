import {Link, useLocation} from 'react-router-dom'
const links = [
  {to: '/dashboard', label: 'Dashboard', icon: '🏠'},
  {to: '/tasks', label: 'Tasks', icon: '✅'},
  {to: '/expenses', label: 'Expenses', icon: '💰'},
  {to: '/goals', label: 'Goals', icon: '🎯'},
  {to: '/attendance', label: 'Attendance', icon: '📅'},
  {to: '/notes', label: 'Notes', icon: '📝'},
  {to: '/documents', label: 'Documents', icon: '📁'},
]
function Navbar() {
  const loc = useLocation()
  return (
    <aside className="sb">
      <div className="sb-logo">Student<span>Sphere</span></div>
      <ul>
        {links.map(l => (
          <li key={l.to}>
            <Link to={l.to} className={loc.pathname === l.to ? 'active' : ''}>
              <span>{l.icon}</span>{l.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
export default Navbar