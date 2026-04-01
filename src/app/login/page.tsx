'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Using magic link for simplicity
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`
      }
    })

    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      setMessage('Check your email for the login link!')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-2xl shadow-xl border border-slate-100">
      <h1 className="text-2xl font-bold mb-6 text-center">Login / Sign Up</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-700">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="name@example.com"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-golf-green outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-golf-green text-white py-2 rounded-lg font-bold hover:bg-golf-grass disabled:opacity-50"
        >
          {loading ? 'Sending link...' : 'Send Magic Link'}
        </button>
      </form>
      {message && <p className="mt-4 text-center text-sm text-golf-green font-medium">{message}</p>}
      <p className="mt-6 text-xs text-center text-slate-400">
        No password needed. We'll email you a secure link to log in.
      </p>
    </div>
  )
}
