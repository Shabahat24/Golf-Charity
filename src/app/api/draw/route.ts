import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// This would normally be triggered by an admin or CRON job
export async function POST(req: Request) {
  try {
    // 1. Generate 5 unique random numbers between 1 and 45
    const drawNumbers: number[] = [];
    while (drawNumbers.length < 5) {
      const r = Math.floor(Math.random() * 45) + 1;
      if (drawNumbers.indexOf(r) === -1) drawNumbers.push(r);
    }

    // 2. Fetch all users and their scores
    // In a real app, you'd only fetch users with 'active' status
    const { data: allScores, error } = await supabase
      .from('golf_scores')
      .select('user_id, score')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // 3. Simple matching logic (Group scores by user)
    const userMatches: Record<string, number> = {};
    
    allScores.forEach((row) => {
      // Logic only looks at the first 5 records per user (handled via grouping or subquery in prod)
      if (drawNumbers.includes(row.score)) {
        userMatches[row.user_id] = (userMatches[row.user_id] || 0) + 1;
      }
    });

    // 4. Return results (In prod, you'd save these to a 'draw_results' table)
    return NextResponse.json({
      draw: drawNumbers,
      matches: userMatches,
      message: "Draw completed successfully"
    });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
