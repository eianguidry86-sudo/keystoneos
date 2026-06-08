# FounderOS

AI-Assisted Multi-Business Operating System for solo founders running multiple ventures simultaneously.

---

## What It Does

- **Multi-business dashboard** — FUNdamentals Basketball Academy + MarketMap Analytics in one place
- **Backend Operations tracking** — LLC, EIN, legal, CRM, financials per business
- **Product Development tracking** — curriculum, tech, UX, AI systems per business
- **Domino-style progress bars** — segmented visual milestones, animated
- **AI Session Memory** — paste Claude/ChatGPT output → auto-parsed into structured "where I left off" logs
- **Resource Library** — PDFs, YouTube, GitHub, AI exports, Loom, articles with tags + search
- **n8n Automation** — workflow that auto-generates session summaries from active task state
- **Timeline visualization** — parallel tasks with intersecting dependency nodes

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), React, TypeScript, Tailwind CSS |
| Backend | Supabase (PostgreSQL, Auth, Storage, Realtime) |
| AI | Anthropic Claude API (session parsing + summarization) |
| Automation | n8n (self-hosted — Railway/Render free tier) |
| Hosting | Netlify |

---

## Setup

### 1. Clone & Install

```bash
git clone https://github.com/yourname/founderos
cd founderos
npm install
cp .env.local.example .env.local
```

### 2. Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run:
   ```sql
   -- Run in order:
   -- supabase/migrations/001_initial_schema.sql
   -- supabase/seed/001_seed_data.sql
   ```
3. Copy your Project URL and anon key into `.env.local`

### 3. Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY

ANTHROPIC_API_KEY=sk-ant-...

N8N_WEBHOOK_URL=https://your-n8n.railway.app/webhook/founderos-end-session
N8N_WEBHOOK_SECRET=your-random-secret-token

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Locally

```bash
npm run dev
# → http://localhost:3000
```

### 5. Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Link and deploy
netlify init
netlify deploy --prod
```

Set all env vars in Netlify dashboard under **Site Settings → Environment Variables**.

---

## n8n Automation Setup

### Option A: Railway (Free Tier)

1. Go to [railway.app](https://railway.app)
2. Deploy n8n template
3. Set env vars: `N8N_BASIC_AUTH_USER`, `N8N_BASIC_AUTH_PASSWORD`, `WEBHOOK_URL`

### Option B: Local (Development)

```bash
npx n8n start
# → http://localhost:5678
```

### Import Workflow

1. Open n8n dashboard
2. Go to **Workflows → Import from File**
3. Upload `n8n/workflows/ai-session-memory.json`
4. Set credentials for Anthropic and HTTP Request nodes
5. Activate workflow

### Trigger from FounderOS

The **End Session** button → n8n webhook → Claude summarizes active tasks → saves to dashboard automatically.

---

## Project Structure

```
founderos/
├── app/
│   ├── dashboard/              # Master dashboard
│   ├── (business)/
│   │   └── [businessId]/
│   │       ├── backend/        # Backend operations page
│   │       ├── product/        # Product dev page
│   │       ├── resources/      # Resource library
│   │       ├── timeline/       # Timeline visualization
│   │       └── sessions/       # AI session logs
│   ├── (auth)/login/           # Login page
│   └── api/
│       ├── tasks/              # Task CRUD
│       ├── sessions/           # Session log API (with AI parsing)
│       ├── resources/          # Resource CRUD
│       └── n8n/session/        # n8n webhook receiver
│
├── components/
│   ├── layout/                 # AppShell, Sidebar, Topbar, Providers
│   ├── dashboard/              # DashboardClient, OpsPageClient
│   ├── tasks/                  # TaskCard, TaskList, NewTaskModal
│   ├── sessions/               # SessionCard, EndSessionModal
│   ├── resources/              # ResourcesClient
│   └── ui/                     # DominoBar, shared components
│
├── lib/
│   ├── supabase/               # client.ts, server.ts, queries.ts
│   ├── ai/                     # summarize.ts (Claude integration)
│   ├── hooks/                  # useStore.ts (Zustand)
│   └── utils/                  # cn, formatters, status helpers
│
├── types/                      # index.ts — all TypeScript interfaces
├── supabase/
│   ├── migrations/             # 001_initial_schema.sql
│   └── seed/                   # 001_seed_data.sql
└── n8n/workflows/              # ai-session-memory.json
```

---

## Adding a New Business

1. Insert into `businesses` table in Supabase
2. Insert categories for `backend` and `product` modules
3. Seed initial tasks
4. The sidebar and dashboard auto-populate

---

## Cost Breakdown

| Service | Cost |
|---------|------|
| Netlify | Free (100GB bandwidth/mo) |
| Supabase | Free (500MB DB, 50MB storage) |
| n8n (Railway) | Free tier (~$0-5/mo depending on usage) |
| Anthropic API | ~$0.01–0.05 per session parse (very low usage) |
| **Total** | **~$0–5/month** |

To eliminate AI costs entirely: use the **heuristic parser** (automatic fallback if no API key) or self-host **Ollama** locally for session summaries.

---

## Roadmap

- [ ] Timeline visualization with drag-and-drop
- [ ] Supabase Realtime for live task updates
- [ ] Mobile-responsive layouts
- [ ] File upload to Supabase Storage for PDFs
- [ ] Weekly AI recap emails via n8n
- [ ] Team collaboration (multi-user)
