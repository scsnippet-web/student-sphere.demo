import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Sidebar       from './components/Sidebar'
import Dashboard     from './pages/Dashboard'
import CGPAPage      from './pages/CGPAPage'
import TodoPage      from './pages/TodoPage'
import ExpensePage   from './pages/ExpensePage'
import GoalsPage     from './pages/GoalsPage'
import DocsPage      from './pages/DocsPage'
import AttendancePage from './pages/AttendancePage'
export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div style={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
          <Sidebar />
          <main style={{ flex: 1, background: 'var(--bg)', overflowY: 'auto' }}>
            <Routes>
              <Route path="/"        element={<Dashboard       />} />
              <Route path="/cgpa"    element={<CGPAPage       />} />
              <Route path="/todo"    element={<TodoPage       />} />
              <Route path="/expense" element={<ExpensePage    />} />
              <Route path="/goals"   element={<GoalsPage      />} />
              <Route path="/docs"    element={<DocsPage       />} />
              <Route path="/attend"  element={<AttendancePage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AppProvider>
  )
}
