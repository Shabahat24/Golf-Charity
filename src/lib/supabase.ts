import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  email: string;
  subscription_status: 'active' | 'inactive';
  charity_id: string | null;
  charity_percentage: number;
};

export type GolfScore = {
  id: string;
  user_id: string;
  score: number;
  created_at: string;
};

export type Charity = {
  id: string;
  name: string;
  description: string;
  image_url: string;
};
