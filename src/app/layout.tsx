import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { Trophy } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Golf Charity Draw',
  description: 'Submit your scores, support charities, win jackpots.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 min-h-screen`}>
        <nav className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-golf-green text-xl">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <span>Golf Charity Subscription Platform</span>
            </Link>
            <div className="flex gap-4 items-center">
              <Link href="/dashboard" className="text-sm font-medium hover:text-golf-green">Dashboard</Link>
              <Link href="/login" className="bg-golf-green text-white px-4 py-2 rounded-lg text-sm hover:bg-golf-grass transition">
                Sign In
              </Link>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="py-8 text-center text-slate-500 text-sm border-t mt-12 bg-white">
          &copy; 2024 Golf Charity Platform. All rights reserved.
        </footer>
      </body>
    </html>
  )
}
