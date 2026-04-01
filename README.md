# Golf Charity Platform

A platform where golfers subscribe, enter their monthly scores, and win jackpots while supporting their chosen charities.

## Features
- **Modern Landing Page**: Built with Framer Motion and Tailwind.
- **Score Entry**: Users can input their latest golf scores (limited to 5).
- **Charity Choice**: Users select which charity gets their donation share (min 10%).
- **Draw Engine**: Backend logic to generate random numbers and calculate winners.
- **Auth**: Secure email-based login using Supabase.

## 🛠 Prerequisites
1. **Node.js**: (Version 18 or higher)
2. **Supabase Account**: Free project for DB and Auth.
3. **Stripe Account**: For processing subscriptions.

## 🚀 Setup Instructions

### 1. Create the Database Tables
Go to your **Supabase Dashboard -> SQL Editor** and run this script:

    -- Profiles: Stores user subscription and charity choice
    create table profiles (
      id uuid references auth.users on delete cascade primary key,
      email text,
      subscription_status text default 'inactive',
      charity_id text,
      charity_percentage int default 10
    );

    -- Golf Scores: Stores user scores (ensure logic limits to latest 5)
    create table golf_scores (
      id uuid default gen_random_uuid() primary key,
      user_id uuid references auth.users on delete cascade,
      score int check (score >= 1 and score <= 45),
      created_at timestamp with time zone default timezone('utc'::text, now())
    );

    -- Trigger to create profile on signup
    create function public.handle_new_user()
    returns trigger as $$
    begin
      insert into public.profiles (id, email)
      values (new.id, new.email);
      return new;
    end;
    $$ language plpgsql security definer;

    create trigger on_auth_user_created
      after insert on auth.users
      for each row execute procedure public.handle_new_user();

### 2. Environment Variables
Create a file named `.env.local` in the root folder. Copy the contents from `.env.example` and replace the placeholders with your actual keys from Supabase and Stripe.

### 3. Installation
Open your terminal in the project folder and run:
    
    npm install

### 4. Running the App
Start the development server:
    
    npm run dev

Open `http://localhost:3000` in your browser.

## ⚙️ How it Works
1. **Sign In**: Enter your email to get a "Magic Link". Check your email and click the link.
2. **Dashboard**: Navigate to the dashboard. You can enter golf scores between 1 and 45.
3. **Admin Draw**: Navigate to `/admin/draw`. Click the button to simulate the monthly raffle. It will check all scores in the database against 5 random winning numbers.

## 📂 Project Structure
- `src/app/page.tsx`: The landing page.
- `src/app/dashboard/page.tsx`: Main user area for scoring.
- `src/app/api/draw/route.ts`: The logic that "picks" winners.
- `src/lib/supabase.ts`: Database configuration.
