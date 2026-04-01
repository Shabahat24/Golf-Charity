'use client'
import { useState } from 'react'

export default function AdminDrawPage() {
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const runDraw = async () => {
    setLoading(true)
    const res = await fetch('/api/draw', { method: 'POST' })
    const data = await res.json()
    setResults(data)
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto p-10 text-center">
      <h1 className="text-3xl font-bold mb-6">Admin Draw Control</h1>
      <p className="mb-8 text-slate-500">Clicking this button will randomly generate 5 numbers and check all user scores for matches.</p>
      
      <button 
        onClick={runDraw}
        disabled={loading}
        className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold text-xl hover:bg-slate-800 disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Run Monthly Draw'}
      </button>

      {results && (
        <div className="mt-12 p-6 bg-green-50 border border-green-200 rounded-2xl text-left">
          <h2 className="text-xl font-bold mb-4">Results</h2>
          <div className="flex gap-4 mb-6">
            {results.draw.map((n: number) => (
              <span key={n} className="w-12 h-12 bg-white border-2 border-golf-green rounded-full flex items-center justify-center font-bold text-lg">
                {n}
              </span>
            ))}
          </div>
          <h3 className="font-bold">Summary</h3>
          <pre className="text-xs bg-white p-4 rounded mt-2 border">
            {JSON.stringify(results.matches, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
