-- Migration to add default categories for KeystoneOS

-- Backend Categories
INSERT INTO categories (business_id, name, module, sort_order) VALUES
  ('33333333-3333-3333-3333-333333333333', 'Company Formation',       'backend', 1),
  ('33333333-3333-3333-3333-333333333333', 'Financial Infrastructure', 'backend', 2),
  ('33333333-3333-3333-3333-333333333333', 'Legal & Compliance',      'backend', 3),
  ('33333333-3333-3333-3333-333333333333', 'Operations',              'backend', 4)
ON CONFLICT DO NOTHING;

-- Product Categories
INSERT INTO categories (business_id, name, module, sort_order) VALUES
  ('33333333-3333-3333-3333-333333333333', 'Technology',              'product', 1),
  ('33333333-3333-3333-3333-333333333333', 'Dev Log / Session Tracking', 'product', 2),
  ('33333333-3333-3333-3333-333333333333', 'AI Systems',              'product', 3),
  ('33333333-3333-3333-3333-333333333333', 'UX / UI',                 'product', 4)
ON CONFLICT DO NOTHING;
