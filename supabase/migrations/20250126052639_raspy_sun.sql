/*
  # Create posts table

  1. New Tables
    - `posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `content` (text)
      - `excerpt` (text)
      - `published` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `author_id` (uuid, references auth.users)
      - `image_url` (text)

  2. Security
    - Enable RLS on `posts` table
    - Add policies for CRUD operations
*/

CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  author_id uuid REFERENCES auth.users NOT NULL,
  image_url text
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Allow users to read published posts
CREATE POLICY "Anyone can read published posts"
  ON posts
  FOR SELECT
  USING (published = true);

-- Allow authors to manage their own posts
CREATE POLICY "Authors can manage their own posts"
  ON posts
  USING (auth.uid() = author_id);