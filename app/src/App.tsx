import { useState } from 'react'
import SignIn from './screens/SignIn'
import Dashboard from './screens/Dashboard'

type Screen = 'sign-in' | 'dashboard'

export default function App() {
  const [screen, setScreen] = useState<Screen>('sign-in')

  return (
    <div className="min-h-screen bg-neutral-50">
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 rounded-full bg-white p-1 shadow-lg ring-1 ring-black/5">
        {(['sign-in', 'dashboard'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setScreen(s)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              screen === s ? 'bg-violet-600 text-white' : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            {s === 'sign-in' ? 'Sign In' : 'Dashboard'}
          </button>
        ))}
      </nav>
      {screen === 'sign-in' ? <SignIn /> : <Dashboard />}
    </div>
  )
}
