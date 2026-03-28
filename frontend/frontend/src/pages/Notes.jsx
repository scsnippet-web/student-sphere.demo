import { useEffect, useMemo, useState } from 'react'
import { Plus, Trash2, Search, Edit, X } from 'lucide-react'

export default function NotesPage() {
  const [notes, setNotes] = useState([])
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editId, setEditId] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = window.localStorage.getItem('studentSphereNotes')
    if (stored) {
      try {
        setNotes(JSON.parse(stored))
      } catch (err) {
        console.warn('Failed to parse notes from storage', err)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('studentSphereNotes', JSON.stringify(notes))
  }, [notes])

  const visibleNotes = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return notes
    return notes.filter(note =>
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
    )
  }, [notes, search])

  const noteCount = notes.length
  const filteredCount = visibleNotes.length

  function resetForm() {
    setTitle('')
    setContent('')
    setEditId(null)
    setError('')
  }

  function closeForm() {
    resetForm()
    setShowForm(false)
  }

  function saveNote() {
    const noteTitle = title.trim()
    const noteContent = content.trim()
    if (!noteTitle && !noteContent) {
      setError('Please add a title or some note content.')
      return
    }

    if (editId) {
      setNotes(prev => prev.map(note =>
        note.id === editId
          ? { ...note, title: noteTitle, content: noteContent, updatedAt: Date.now() }
          : note
      ))
    } else {
      const newNote = {
        id: Date.now(),
        title: noteTitle,
        content: noteContent,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
      setNotes(prev => [newNote, ...prev])
    }

    closeForm()
  }

  function startEdit(note) {
    setTitle(note.title)
    setContent(note.content)
    setEditId(note.id)
    setError('')
    setShowForm(true)
  }

  function deleteNote(id) {
    setNotes(prev => prev.filter(note => note.id !== id))
  }

  function formatDate(timestamp) {
    return new Date(timestamp).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <div style={{ padding: '30px 32px', flex: 1, overflowY: 'auto', maxWidth: 1060 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font1)', fontSize: 24, fontWeight: 800, letterSpacing: '-.3px' }}>Notes</h2>
          <p style={{ color: 'var(--txt2)', fontSize: 13, marginTop: 4 }}>
            {noteCount} saved note{noteCount === 1 ? '' : 's'} · showing {filteredCount}
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '999px', padding: '8px 12px' }}>
            <Search size={16} color="var(--txt3)" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="search notes"
              style={{
                border: 'none', outline: 'none', background: 'transparent', color: 'var(--txt)', fontSize: 13,
                minWidth: 180,
              }}
            />
          </div>
          <button
            onClick={() => {
              resetForm()
              setShowForm(prev => !prev)
            }}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: showForm ? 'var(--border2)' : 'var(--cyan)',
              color: showForm ? 'var(--txt)' : '#070b12',
              border: 'none', borderRadius: '999px', padding: '10px 16px', cursor: 'pointer', fontWeight: 700,
            }}
          >
            <Plus size={16} /> {showForm ? 'Close' : 'New Note'}
          </button>
        </div>
      </div>

      {showForm && (
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--rad2)', padding: '18px 20px', marginBottom: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div>
              <p style={{ fontFamily: 'var(--font1)', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>Write a note</p>
              <p style={{ fontSize: 12, color: 'var(--txt3)' }}>Save quick notes, ideas, and reminders.</p>
            </div>
            {editId && (
              <button
                onClick={closeForm}
                style={{ border: 'none', background: 'transparent', color: 'var(--txt3)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                <X size={18} />
              </button>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Note title"
              style={{
                width: '100%', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--rad)', padding: '11px 14px',
                color: 'var(--txt)', fontSize: 13,
              }}
            />
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Write your note here..."
              rows={6}
              style={{
                width: '100%', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--rad)', padding: '12px 14px',
                color: 'var(--txt)', fontSize: 13, resize: 'vertical', minHeight: 156,
              }}
            />
            {error && <p style={{ color: '#f43f5e', fontSize: 12 }}>{error}</p>}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={saveNote}
                style={{
                  background: 'var(--cyan)', color: '#070b12', border: 'none', borderRadius: 'var(--rad)',
                  padding: '11px 18px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                }}
              >
                <Plus size={16} /> {editId ? 'Update Note' : 'Save Note'}
              </button>
            </div>
          </div>
        </div>
      )}

      {visibleNotes.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--txt3)', padding: '60px 0', fontSize: 14 }}>
          {search ? 'No notes match your search.' : 'No notes yet — create one to get started.'}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
          {visibleNotes.map(note => (
            <div key={note.id} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--rad2)', padding: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'var(--font1)', fontSize: 16, fontWeight: 700, color: 'var(--txt)', marginBottom: 6, minHeight: 42 }}>
                    {note.title || 'Untitled note'}
                  </p>
                  <p style={{ fontSize: 13, color: 'var(--txt3)', whiteSpace: 'pre-wrap', overflow: 'hidden', maxHeight: 120, lineHeight: 1.6 }}>
                    {note.content || 'No additional details.'}
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
                  <button
                    onClick={() => startEdit(note)}
                    style={{ border: 'none', background: 'transparent', color: 'var(--txt3)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    title="Edit note"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    style={{ border: 'none', background: 'transparent', color: 'var(--txt3)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    title="Delete note"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12, color: 'var(--txt3)' }}>
                  {formatDate(note.updatedAt || note.createdAt)}
                </span>
                <span style={{ fontSize: 12, color: 'var(--txt3)' }}>
                  {note.content ? `${note.content.length} chars` : 'empty'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
