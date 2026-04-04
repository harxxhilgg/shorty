-- Create the links table
CREATE TABLE links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  original_url text NOT NULL,
  short_code varchar(10) UNIQUE NOT NULL,
  clicks integer DEFAULT 0,
  created_at timestamp DEFAULT now()
);

-- Index for faster lookups on short_code
CREATE INDEX idx_short_code ON links (short_code);

-- Optional: Index for de-duplication
CREATE INDEX idx_original_url ON links (original_url);

-- Enable RLS (optional but recommended)
ALTER TABLE links ENABLE ROW LEVEL SECURITY;

-- Allow public read access to links (for redirects)
CREATE POLICY "Allow public read access to links" ON links
  FOR SELECT USING (true);

-- Allow anonymous inserts (for the shortener)
-- In a real app, you might want to restrict this more.
CREATE POLICY "Allow anonymous inserts" ON links
  FOR INSERT WITH CHECK (true);

-- Allow click incrementing (UPDATE)
CREATE POLICY "Allow click updates" ON links
  FOR UPDATE USING (true);
