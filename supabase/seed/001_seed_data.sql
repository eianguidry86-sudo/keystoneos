-- ============================================================
-- FounderOS — Seed Data
-- Run AFTER 001_initial_schema.sql
-- ============================================================

-- ─── BUSINESSES ───────────────────────────────

INSERT INTO businesses (id, name, slug, description, color, icon) VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'FUNdamentals Basketball Academy',
    'fundamentals',
    'Youth basketball training academy focused on IQ, shooting, and athletic development for ages 5–14.',
    '#6c63ff',
    '🏀'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'MarketMap Analytics',
    'marketmap',
    'AI-powered GIS and market intelligence SaaS platform for commercial real estate and franchise operators.',
    '#14b8a6',
    '📊'
  );

-- ─── CATEGORIES: FUNdamentals — Backend ───────

INSERT INTO categories (business_id, name, module, sort_order) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Company Formation',       'backend', 1),
  ('11111111-1111-1111-1111-111111111111', 'Financial Infrastructure', 'backend', 2),
  ('11111111-1111-1111-1111-111111111111', 'Legal',                    'backend', 3),
  ('11111111-1111-1111-1111-111111111111', 'CRM & Sales',              'backend', 4),
  ('11111111-1111-1111-1111-111111111111', 'Operations',               'backend', 5),
  ('11111111-1111-1111-1111-111111111111', 'Strategic Planning',       'backend', 6);

-- ─── CATEGORIES: FUNdamentals — Product ───────

INSERT INTO categories (business_id, name, module, sort_order) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Curriculum Development',   'product', 1),
  ('11111111-1111-1111-1111-111111111111', 'Facility Development',     'product', 2),
  ('11111111-1111-1111-1111-111111111111', 'Media & Brand',            'product', 3),
  ('11111111-1111-1111-1111-111111111111', 'Technology',               'product', 4),
  ('11111111-1111-1111-1111-111111111111', 'Customer Experience',      'product', 5);

-- ─── CATEGORIES: MarketMap — Backend ──────────

INSERT INTO categories (business_id, name, module, sort_order) VALUES
  ('22222222-2222-2222-2222-222222222222', 'Company Formation',        'backend', 1),
  ('22222222-2222-2222-2222-222222222222', 'Financial Infrastructure', 'backend', 2),
  ('22222222-2222-2222-2222-222222222222', 'Legal & Compliance',       'backend', 3),
  ('22222222-2222-2222-2222-222222222222', 'CRM & Sales',              'backend', 4),
  ('22222222-2222-2222-2222-222222222222', 'Strategic Planning',       'backend', 5);

-- ─── CATEGORIES: MarketMap — Product ──────────

INSERT INTO categories (business_id, name, module, sort_order) VALUES
  ('22222222-2222-2222-2222-222222222222', 'Data Infrastructure',         'product', 1),
  ('22222222-2222-2222-2222-222222222222', 'AI Systems',                  'product', 2),
  ('22222222-2222-2222-2222-222222222222', 'UX / UI',                     'product', 3),
  ('22222222-2222-2222-2222-222222222222', 'Market Intelligence Features', 'product', 4),
  ('22222222-2222-2222-2222-222222222222', 'Dev Log / Session Tracking',   'product', 5);

-- ─── TASKS: FUNdamentals — Company Formation ──

INSERT INTO tasks (business_id, category_id, title, status, priority, sort_order)
SELECT
  '11111111-1111-1111-1111-111111111111',
  c.id,
  t.title,
  t.status::task_status,
  t.priority::task_priority,
  t.sort_order
FROM categories c
JOIN (VALUES
  ('Register LLC with Florida Division of Corporations',  'in_progress', 'critical', 1),
  ('Obtain EIN from IRS (Form SS-4)',                     'not_started', 'critical', 2),
  ('Open dedicated business bank account',                'not_started', 'high',     3),
  ('Purchase general liability insurance',                'not_started', 'high',     4),
  ('File DBA if operating under different name',          'not_started', 'medium',   5),
  ('Trademark "FUNdamentals Basketball Academy"',         'not_started', 'medium',   6)
) AS t(title, status, priority, sort_order)
  ON c.business_id = '11111111-1111-1111-1111-111111111111'
  AND c.name = 'Company Formation'
  AND c.module = 'backend';

-- ─── TASKS: FUNdamentals — Financial Infrastructure ─

INSERT INTO tasks (business_id, category_id, title, status, priority, sort_order)
SELECT
  '11111111-1111-1111-1111-111111111111',
  c.id,
  t.title,
  t.status::task_status,
  t.priority::task_priority,
  t.sort_order
FROM categories c
JOIN (VALUES
  ('Set up QuickBooks or Wave Accounting',        'not_started', 'medium', 1),
  ('Link Stripe for registration payments',       'not_started', 'high',   2),
  ('Create revenue forecast model',               'not_started', 'medium', 3),
  ('Set up expense tracking process',             'not_started', 'medium', 4),
  ('Define pricing — session & monthly packages', 'not_started', 'high',   5)
) AS t(title, status, priority, sort_order)
  ON c.business_id = '11111111-1111-1111-1111-111111111111'
  AND c.name = 'Financial Infrastructure'
  AND c.module = 'backend';

-- ─── TASKS: FUNdamentals — Legal ──────────────

INSERT INTO tasks (business_id, category_id, title, status, priority, sort_order)
SELECT
  '11111111-1111-1111-1111-111111111111',
  c.id,
  t.title,
  t.status::task_status,
  t.priority::task_priority,
  t.sort_order
FROM categories c
JOIN (VALUES
  ('Draft liability waiver for players/parents',      'in_progress', 'critical', 1),
  ('Create parent/guardian consent form',             'not_started', 'critical', 2),
  ('Coach independent contractor agreements',         'not_started', 'high',     3),
  ('Privacy policy for website & communications',     'not_started', 'high',     4),
  ('Facility rental/use agreement template',          'not_started', 'medium',   5)
) AS t(title, status, priority, sort_order)
  ON c.business_id = '11111111-1111-1111-1111-111111111111'
  AND c.name = 'Legal'
  AND c.module = 'backend';

-- ─── TASKS: FUNdamentals — CRM & Sales ────────

INSERT INTO tasks (business_id, category_id, title, status, priority, sort_order)
SELECT
  '11111111-1111-1111-1111-111111111111',
  c.id,
  t.title,
  t.status::task_status,
  t.priority::task_priority,
  t.sort_order
FROM categories c
JOIN (VALUES
  ('Set up CRM (HubSpot free or Airtable)',            'not_started', 'medium', 1),
  ('Build outreach list — local parents/schools',      'not_started', 'high',   2),
  ('Local business sponsorship outreach',              'not_started', 'medium', 3),
  ('Email nurture sequence for leads',                 'not_started', 'medium', 4),
  ('Partnership outreach — gyms & community centers',  'not_started', 'medium', 5)
) AS t(title, status, priority, sort_order)
  ON c.business_id = '11111111-1111-1111-1111-111111111111'
  AND c.name = 'CRM & Sales'
  AND c.module = 'backend';

-- ─── TASKS: FUNdamentals — Curriculum Development ─

INSERT INTO tasks (business_id, category_id, title, status, priority, sort_order, completion_percent)
SELECT
  '11111111-1111-1111-1111-111111111111',
  c.id,
  t.title,
  t.status::task_status,
  t.priority::task_priority,
  t.sort_order,
  t.pct
FROM categories c
JOIN (VALUES
  ('Ages 5–7 shooting fundamentals curriculum',   'in_progress', 'high',   1, 40),
  ('Ages 8–10 basketball IQ training module',     'not_started', 'high',   2, 0),
  ('Athletic development framework (all ages)',   'not_started', 'medium', 3, 0),
  ('Drill progressions — dribbling & footwork',   'not_started', 'high',   4, 0),
  ('Assessment rubric — player skill levels',     'not_started', 'medium', 5, 0)
) AS t(title, status, priority, sort_order, pct)
  ON c.business_id = '11111111-1111-1111-1111-111111111111'
  AND c.name = 'Curriculum Development'
  AND c.module = 'product';

-- ─── TASKS: FUNdamentals — Facility Development ─

INSERT INTO tasks (business_id, category_id, title, status, priority, sort_order)
SELECT
  '11111111-1111-1111-1111-111111111111',
  c.id,
  t.title,
  t.status::task_status,
  t.priority::task_priority,
  t.sort_order
FROM categories c
JOIN (VALUES
  ('Scout gym locations in Jacksonville',          'in_progress', 'high',   1),
  ('Evaluate Riverside & Mandarin area venues',   'in_progress', 'high',   2),
  ('Equipment list — balls, cones, hoops, etc.',  'not_started', 'high',   3),
  ('Vendor quotes for equipment',                 'not_started', 'medium', 4),
  ('Gym layout & court design',                   'not_started', 'medium', 5)
) AS t(title, status, priority, sort_order)
  ON c.business_id = '11111111-1111-1111-1111-111111111111'
  AND c.name = 'Facility Development'
  AND c.module = 'product';

-- ─── TASKS: FUNdamentals — Media & Brand ──────

INSERT INTO tasks (business_id, category_id, title, status, priority, sort_order, completion_percent)
SELECT
  '11111111-1111-1111-1111-111111111111',
  c.id,
  t.title,
  t.status::task_status,
  t.priority::task_priority,
  t.sort_order,
  t.pct
FROM categories c
JOIN (VALUES
  ('Logo & brand identity',               'completed',    'high',   1, 100),
  ('Website MVP',                         'in_progress',  'high',   2, 30),
  ('Social media setup (IG/TikTok)',      'completed',    'medium', 3, 100),
  ('Content calendar — first 30 days',   'not_started',  'medium', 4, 0),
  ('Podcast — concept & first episode',  'not_started',  'low',    5, 0),
  ('Training video series — outline',    'not_started',  'low',    6, 0)
) AS t(title, status, priority, sort_order, pct)
  ON c.business_id = '11111111-1111-1111-1111-111111111111'
  AND c.name = 'Media & Brand'
  AND c.module = 'product';

-- ─── TASKS: MarketMap — Company Formation ─────

INSERT INTO tasks (business_id, category_id, title, status, priority, sort_order, completion_percent)
SELECT
  '22222222-2222-2222-2222-222222222222',
  c.id,
  t.title,
  t.status::task_status,
  t.priority::task_priority,
  t.sort_order,
  t.pct
FROM categories c
JOIN (VALUES
  ('Register LLC',                             'completed',    'critical', 1, 100),
  ('Obtain EIN',                               'completed',    'critical', 2, 100),
  ('Open business bank account',               'in_progress',  'high',     3, 50),
  ('Trademark "MarketMap"',                    'not_started',  'medium',   4, 0),
  ('Set up registered agent service',          'not_started',  'medium',   5, 0)
) AS t(title, status, priority, sort_order, pct)
  ON c.business_id = '22222222-2222-2222-2222-222222222222'
  AND c.name = 'Company Formation'
  AND c.module = 'backend';

-- ─── TASKS: MarketMap — Legal & Compliance ────

INSERT INTO tasks (business_id, category_id, title, status, priority, sort_order)
SELECT
  '22222222-2222-2222-2222-222222222222',
  c.id,
  t.title,
  t.status::task_status,
  t.priority::task_priority,
  t.sort_order
FROM categories c
JOIN (VALUES
  ('Terms of Service',                           'not_started', 'high',     1),
  ('Privacy Policy (GDPR/CCPA compliant)',       'not_started', 'critical', 2),
  ('Data use agreements with data vendors',      'not_started', 'high',     3),
  ('SaaS customer agreement template',           'not_started', 'high',     4)
) AS t(title, status, priority, sort_order)
  ON c.business_id = '22222222-2222-2222-2222-222222222222'
  AND c.name = 'Legal & Compliance'
  AND c.module = 'backend';

-- ─── TASKS: MarketMap — Strategic Planning ────

INSERT INTO tasks (business_id, category_id, title, status, priority, sort_order)
SELECT
  '22222222-2222-2222-2222-222222222222',
  c.id,
  t.title,
  t.status::task_status,
  t.priority::task_priority,
  t.sort_order
FROM categories c
JOIN (VALUES
  ('Competitor analysis — Esri, CoStar, PitchBook',  'in_progress', 'high',   1),
  ('ICP definition — CRE, franchise, retail',        'not_started', 'high',   2),
  ('Go-to-market roadmap',                           'not_started', 'medium', 3),
  ('SWOT analysis',                                  'not_started', 'medium', 4),
  ('Pricing model — SaaS tiers',                    'in_progress', 'high',   5)
) AS t(title, status, priority, sort_order)
  ON c.business_id = '22222222-2222-2222-2222-222222222222'
  AND c.name = 'Strategic Planning'
  AND c.module = 'backend';

-- ─── TASKS: MarketMap — Data Infrastructure ───

INSERT INTO tasks (business_id, category_id, title, status, priority, sort_order, current_blocker, next_step)
SELECT
  '22222222-2222-2222-2222-222222222222',
  c.id,
  t.title,
  t.status::task_status,
  t.priority::task_priority,
  t.sort_order,
  t.blocker,
  t.next_step
FROM categories c
JOIN (VALUES
  ('Supabase schema — final design',        'in_progress', 'critical', 1, NULL, 'Add PostGIS extension, finalize GIS tables'),
  ('Enable PostGIS on Supabase',            'not_started', 'critical', 2, 'Need to verify PostGIS support on free tier', 'Contact Supabase support or upgrade plan'),
  ('GIS data ingestion pipeline',           'not_started', 'critical', 3, NULL, 'Start after PostGIS confirmed'),
  ('Census/ACS API integration',            'not_started', 'high',     4, NULL, NULL),
  ('Traffic dataset integration (StreetLight or Replica)', 'not_started', 'high', 5, NULL, NULL),
  ('Nextdoor data concept & scraping',      'not_started', 'medium',   6, 'Legal review needed for scraping approach', NULL)
) AS t(title, status, priority, sort_order, blocker, next_step)
  ON c.business_id = '22222222-2222-2222-2222-222222222222'
  AND c.name = 'Data Infrastructure'
  AND c.module = 'product';

-- ─── TASKS: MarketMap — AI Systems ────────────

INSERT INTO tasks (business_id, category_id, title, status, priority, sort_order)
SELECT
  '22222222-2222-2222-2222-222222222222',
  c.id,
  t.title,
  t.status::task_status,
  t.priority::task_priority,
  t.sort_order
FROM categories c
JOIN (VALUES
  ('Location scoring engine v1 (AI-powered)',   'in_progress', 'critical', 1),
  ('n8n AI agent workflow — session memory',    'in_progress', 'high',     2),
  ('Market fit score algorithm',                'not_started', 'high',     3),
  ('Analysis pipeline — full market report',   'not_started', 'high',     4),
  ('AI recommendation engine — site selection', 'not_started', 'medium',  5)
) AS t(title, status, priority, sort_order)
  ON c.business_id = '22222222-2222-2222-2222-222222222222'
  AND c.name = 'AI Systems'
  AND c.module = 'product';

-- ─── TASKS: MarketMap — UX / UI ───────────────

INSERT INTO tasks (business_id, category_id, title, status, priority, sort_order)
SELECT
  '22222222-2222-2222-2222-222222222222',
  c.id,
  t.title,
  t.status::task_status,
  t.priority::task_priority,
  t.sort_order
FROM categories c
JOIN (VALUES
  ('Dashboard wireframes — main map view',      'in_progress', 'high',   1),
  ('Heatmap visualization component',           'not_started', 'high',   2),
  ('User journey mapping',                      'not_started', 'medium', 3),
  ('Onboarding flow design',                    'not_started', 'medium', 4),
  ('Mobile-responsive layouts',                 'not_started', 'medium', 5)
) AS t(title, status, priority, sort_order)
  ON c.business_id = '22222222-2222-2222-2222-222222222222'
  AND c.name = 'UX / UI'
  AND c.module = 'product';

-- ─── SESSION LOGS ─────────────────────────────

INSERT INTO session_logs (business_id, ai_source, summary, completed_items, pending_items, blockers, next_steps, recommended_action)
VALUES
  (
    '22222222-2222-2222-2222-222222222222',
    'claude',
    'Finalized the Supabase schema design for businesses, tasks, resources, and session_logs tables. Started GIS architecture planning — decided on PostGIS extension for spatial queries.',
    ARRAY['Supabase schema v1 designed', 'GIS architecture approach decided', 'PostGIS extension identified'],
    ARRAY['PostGIS setup on Supabase free tier', 'GIS data ingestion pipeline', 'Census API integration'],
    ARRAY['PostGIS extension availability on Supabase free tier needs verification'],
    ARRAY['Configure PostGIS on Supabase', 'Then start data ingestion pipeline for Census API'],
    'Configure PostGIS on Supabase, then start data ingestion pipeline for Census API.'
  ),
  (
    '11111111-1111-1111-1111-111111111111',
    'chatgpt',
    'Drafted the 5–7 age group curriculum outline. Covered shooting mechanics, footwork fundamentals, and parent communication system. Structured 8-week progression.',
    ARRAY['5-7 curriculum outline drafted', 'Shooting mechanics framework created', '8-week progression structured'],
    ARRAY['Facility scouting', 'Ages 8-10 curriculum', 'Equipment list'],
    ARRAY['Need to scout facility before finalizing drill sequences and court dimensions'],
    ARRAY['Visit two gyms in Jacksonville — Riverside and Mandarin area', 'Get square footage and rental rates'],
    'Visit two gyms in Jacksonville — Riverside and Mandarin area. Get square footage + rates.'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'n8n',
    'Built n8n workflow prototype for AI session memory automation. Tested webhook → summarize → Supabase insert flow successfully in local environment.',
    ARRAY['n8n workflow prototype built', 'Webhook flow tested locally', 'Supabase insert verified'],
    ARRAY['Auth token security for webhook', 'Production deployment of n8n', 'End Session UI button wiring'],
    ARRAY['Auth token for n8n webhook needs securing before production deployment'],
    ARRAY['Add bearer token auth to n8n webhook', 'Deploy n8n to Railway or Render'],
    'Add bearer token auth to n8n webhook. Then wire up the End Session button in the dashboard.'
  );

-- ─── RESOURCES ────────────────────────────────

INSERT INTO resources (business_id, title, resource_type, url, tags, is_featured)
VALUES
  -- FUNdamentals
  ('11111111-1111-1111-1111-111111111111', 'Youth Basketball Coaching Masterclass', 'youtube', 'https://youtube.com/...', ARRAY['curriculum', 'coaching', 'reference'], TRUE),
  ('11111111-1111-1111-1111-111111111111', 'Florida LLC Formation Guide — Secretary of State', 'pdf', 'https://dos.fl.gov/...', ARRAY['legal', 'formation', 'florida'], TRUE),
  ('11111111-1111-1111-1111-111111111111', 'USAB Coaching Certification Portal', 'article', 'https://usab.com/...', ARRAY['certification', 'coaching'], FALSE),
  ('11111111-1111-1111-1111-111111111111', 'Curriculum Design — Claude Session Export', 'ai_export', NULL, ARRAY['curriculum', 'ai', 'session'], TRUE),
  -- MarketMap
  ('22222222-2222-2222-2222-222222222222', 'PostGIS Architecture Guide', 'pdf', 'https://postgis.net/docs/', ARRAY['gis', 'database', 'architecture'], TRUE),
  ('22222222-2222-2222-2222-222222222222', 'Supabase + Next.js Full Stack Tutorial', 'youtube', 'https://youtube.com/...', ARRAY['supabase', 'nextjs', 'tutorial'], TRUE),
  ('22222222-2222-2222-2222-222222222222', 'US Census Bureau API Documentation', 'article', 'https://api.census.gov', ARRAY['census', 'api', 'data'], FALSE),
  ('22222222-2222-2222-2222-222222222222', 'GIS Pipeline Design — Claude Session', 'ai_export', NULL, ARRAY['gis', 'architecture', 'ai', 'session'], TRUE);

-- ─── MILESTONES ───────────────────────────────

INSERT INTO milestones (business_id, title, target_date, is_completed)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'LLC Approved & EIN Obtained',        '2026-06-01', FALSE),
  ('11111111-1111-1111-1111-111111111111', 'Facility Signed & Equipment Ordered', '2026-06-15', FALSE),
  ('11111111-1111-1111-1111-111111111111', 'First Session Day',                   '2026-07-01', FALSE),
  ('11111111-1111-1111-1111-111111111111', '10 Registered Players',               '2026-07-15', FALSE),
  ('22222222-2222-2222-2222-222222222222', 'Supabase + PostGIS Live',             '2026-06-01', FALSE),
  ('22222222-2222-2222-2222-222222222222', 'GIS Pipeline v1 Operational',         '2026-06-15', FALSE),
  ('22222222-2222-2222-2222-222222222222', 'Scoring Engine Beta',                 '2026-07-01', FALSE),
  ('22222222-2222-2222-2222-222222222222', 'First Beta Customer Onboarded',        '2026-08-01', FALSE);
