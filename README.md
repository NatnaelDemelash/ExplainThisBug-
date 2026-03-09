# ExplainThisBug 🐛

> Paste your error. Get two explanations instantly — one for your inner 5-year-old, one for the senior dev in you.

---

## What It Does

Developers paste any error message and get two AI-powered explanations streamed live:

- 🧒 **ELI5** — Funny, simple, no jargon. Like explaining to a 5-year-old.
- 🧠 **Senior Dev** — Technical breakdown + how to fix it.

No more Googling for 20 minutes. Just paste and understand.

## Tech Stack

- **Next.js 16** — App framework
- **TypeScript** — Type safety
- **Tailwind CSS** — Styling
- **Groq API** — Fast AI inference with streaming
- **Supabase** — Database + Google Auth
- **Zustand** — State management
- **Vercel** — Deployment

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/explain-this-bug.git
cd explain-this-bug

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your GROQ_API_KEY and Supabase credentials

# Run locally
npm run dev
```

---

## Environment Variables

```env
GROQ_API_KEY=your_groq_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
