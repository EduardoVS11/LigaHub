import React, { useState } from 'react'
import { useUsers } from '../state/UserProvider'

export default function UserMenu() {
  const { users, currentUser, signup, login, logout, createLeague } = useUsers()
  const [show, setShow] = useState(false)
  const [name, setName] = useState('')
  const [role, setRole] = useState<'user'|'organizer'>('user')
  const [leagueName, setLeagueName] = useState('')

  return (
    <div className="relative">
      <button className="toolbar-btn" onClick={()=>setShow(s=>!s)}>{currentUser ? `${currentUser.name} (${currentUser.role})` : 'Sign in'}</button>
      {show && (
        <div className="absolute right-0 mt-2 w-[280px] rounded border border-neutral-300 bg-white p-3 shadow-lg">
          <div className="mb-2 text-sm font-semibold">Users</div>
          <div className="flex gap-2 flex-col">
            <select className="input-inset" value={currentUser?.id || ''} onChange={(e)=>login(e.target.value)}>
              <option value="">-- Choose user --</option>
              {users.map(u => (<option key={u.id} value={u.id}>{u.name} — {u.role}</option>))}
            </select>
            <div className="flex gap-2">
              <input className="input-inset flex-1" placeholder="New user name" value={name} onChange={(e)=>setName(e.target.value)} />
              <select className="input-inset" value={role} onChange={(e)=>setRole(e.target.value as any)}>
                <option value="user">User</option>
                <option value="organizer">Organizer</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button className="toolbar-btn" onClick={()=>{ if (name.trim()) signup(name.trim(), role); setName('') }}>Create</button>
              <button className="toolbar-btn" onClick={()=>{ logout() }}>Logout</button>
            </div>

            <div className="mt-3 border-t pt-2">
              <div className="mb-1 text-sm font-semibold">Organizer actions</div>
              <input className="input-inset" placeholder="League name" value={leagueName} onChange={(e)=>setLeagueName(e.target.value)} />
              <div className="flex gap-2 mt-2">
                <button className="toolbar-btn" onClick={()=>{ if (leagueName.trim()) { const l = createLeague(leagueName.trim()); if (l) setLeagueName('') } }}>Create League</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
