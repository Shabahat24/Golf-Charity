'use client'
import { ArrowRight, Heart, Target, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-20 px-4 bg-gradient-to-b from-golf-accent to-white text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6">
            Play Golf. Support Charity. <br />
            <span className="text-golf-green">Win Real Jackpots.</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Enter your monthly golf scores. We donate a portion of your subscription to 
            your favorite charity. Match the monthly draw numbers to win.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/login" className="bg-golf-green text-white px-8 py-3 rounded-xl font-bold text-lg flex items-center gap-2 hover:scale-105 transition-transform">
              Join Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Social Proof / How it works */}
      <section className="max-w-7xl mx-auto py-24 px-4 grid md:grid-cols-3 gap-12">
        <div className="flex flex-col items-center text-center p-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Star className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">Subscribe</h3>
          <p className="text-slate-500">Pick a flat monthly fee. Select the % you want to donate (min 10%).</p>
        </div>

        <div className="flex flex-col items-center text-center p-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Target className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">Submit Scores</h3>
          <p className="text-slate-500">Enter your 5 best golf scores (1-45). These are your monthly entries.</p>
        </div>

        <div className="flex flex-col items-center text-center p-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">Win & Give</h3>
          <p className="text-slate-500">If your scores match the random monthly draw, you win! Everyone wins by donating.</p>
        </div>
      </section>

      {/* Prize Table Section */}
      <section className="w-full bg-slate-900 py-16 text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Monthly Prize Pool</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-slate-700 p-8 rounded-2xl">
              <h4 className="text-slate-400 mb-2">5 Matches</h4>
              <p className="text-4xl font-bold text-yellow-500">40%</p>
              <p className="text-sm mt-2 text-slate-500">JACKPOT POOL</p>
            </div>
            <div className="border border-slate-700 p-8 rounded-2xl">
              <h4 className="text-slate-400 mb-2">4 Matches</h4>
              <p className="text-4xl font-bold text-slate-200">35%</p>
              <p className="text-sm mt-2 text-slate-500">POOL SHARE</p>
            </div>
            <div className="border border-slate-700 p-8 rounded-2xl">
              <h4 className="text-slate-400 mb-2">3 Matches</h4>
              <p className="text-4xl font-bold text-orange-400">25%</p>
              <p className="text-sm mt-2 text-slate-500">POOL SHARE</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
