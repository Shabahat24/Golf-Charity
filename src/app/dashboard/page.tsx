'use client'
import { useEffect, useState } from 'react'
import { supabase, type Profile, type GolfScore, type Charity } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { PlusCircle, Trash2, Heart, Award } from 'lucide-react'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [scores, setScores] = useState<GolfScore[]>([])
  const [newScore, setNewScore] = useState('')
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function getData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)

      // Fetch Profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      
      setProfile(profileData)

      // Fetch latest 5 scores
      const { data: scoreData } = await supabase
        .from('golf_scores')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5)

      setScores(scoreData || [])
      setLoading(false)
    }
    getData()
  }, [])

  const addScore = async (e: React.FormEvent) => {
    e.preventDefault()
    const scoreVal = parseInt(newScore)
    if (isNaN(scoreVal) || scoreVal < 1 || scoreVal > 45) return alert("Score must be 1-45")

    const { data, error } = await supabase
      .from('golf_scores')
      .insert([{ user_id: user.id, score: scoreVal }])
      .select()

    if (error) alert(error.message)
    else {
      setScores([data[0], ...scores].slice(0, 5))
      setNewScore('')
    }
  }

  if (loading) return <div className="p-10 text-center">Loading...</div>

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-10">
      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Left Column: Profile & Charity */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Award className="text-golf-green" /> Profile
            </h2>
            <p className="text-sm text-slate-500 mb-1">Email</p>
            <p className="font-medium mb-4">{user.email}</p>
            
            <p className="text-sm text-slate-500 mb-1">Subscription</p>
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-2 py-1 rounded text-xs font-bold ${profile?.subscription_status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {profile?.subscription_status?.toUpperCase() || 'INACTIVE'}
              </span>
            </div>

            {profile?.subscription_status !== 'active' && (
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-bold">
                Subscribe to Play
              </button>
            )}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Heart className="text-red-500" /> Charity Choice
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              Current Donation: <span className="font-bold">{profile?.charity_percentage || 10}%</span>
            </p>
            <select className="w-full p-2 border rounded-lg text-sm bg-slate-50">
              <option>Cancer Research Foundation</option>
              <option>Junior Golf Development</option>
              <option>Clean Water Initiative</option>
            </select>
          </div>
        </div>

        {/* Right Column: Game Plays */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Draw Entries</h2>
              <p className="text-slate-500 text-sm">Last 5 scores used</p>
            </div>

            <form onSubmit={addScore} className="flex gap-2 mb-8">
              <input 
                type="number" 
                min="1" 
                max="45" 
                value={newScore}
                onChange={(e) => setNewScore(e.target.value)}
                placeholder="Enter Score (1-45)" 
                className="flex-1 px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-golf-green"
              />
              <button 
                type="submit"
                className="bg-golf-green text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2"
              >
                <PlusCircle className="w-5 h-5" /> Add
              </button>
            </form>

            <div className="space-y-3">
              {scores.length === 0 ? (
                <p className="text-center py-10 text-slate-400">No scores entered yet.</p>
              ) : (
                scores.map((s, idx) => (
                  <div key={s.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-4">
                      <span className="w-8 h-8 rounded-full bg-golf-green text-white flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <span className="text-xl font-bold">Score: {s.score}</span>
                    </div>
                    <span className="text-xs text-slate-400">Entered {new Date(s.created_at).toLocaleDateString()}</span>
                  </div>
                ))
              )}
            </div>
            {scores.length > 0 && scores.length < 5 && (
              <p className="mt-4 text-xs text-orange-600 bg-orange-50 p-2 rounded">
                Note: You need 5 scores to be eligible for the monthly jackpot!
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
