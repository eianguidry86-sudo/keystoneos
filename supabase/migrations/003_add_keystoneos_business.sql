-- Migration to add KeystoneOS to businesses

INSERT INTO businesses (id, name, slug, description, color, icon) VALUES
  (
    '33333333-3333-3333-3333-333333333333',
    'KeystoneOS',
    'keystoneos',
    'The overarching OS managing all other businesses.',
    '#34d399', -- emerald-400
    '🔑'
  )
ON CONFLICT (id) DO NOTHING;
