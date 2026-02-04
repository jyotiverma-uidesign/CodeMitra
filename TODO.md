# Fix Gallery 404 Error

## Issue
- Gallery page is getting 404 error when querying `gallery_items` table from Supabase
- Error: "Failed to load resource: the server responded with a status of 404 ()"

## Root Cause
- The `gallery_items` table is missing from the Supabase database
- The table is defined in `src/components/integration/supabase/types.ts` but not created in the database

## Solution
1. **Create the gallery_items table in Supabase:**
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Copy and paste the following SQL and run it:

```sql
-- Create gallery_items table
CREATE TABLE IF NOT EXISTS gallery_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  is_featured BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;

-- Create policies for gallery_items table
CREATE POLICY "Anyone can view gallery items" ON gallery_items
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage gallery items" ON gallery_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );
```

2. **Verify the table creation:**
   - Check in Supabase dashboard under Tables
   - The `gallery_items` table should now exist

3. **Test the Gallery page:**
   - Refresh the Gallery page
   - The 404 error should be resolved
   - If no items are shown, that's expected (empty table)

## Additional Notes
- The `backend/create_tables.sql` has been updated with the gallery_items table definition
- RLS policies allow anyone to view gallery items, but only admins can manage them
- The proxy.js error seems unrelated (likely browser extension issue)

## Next Steps
- After creating the table, consider adding some sample gallery items for testing
- Implement admin functionality to add/edit gallery items if needed
