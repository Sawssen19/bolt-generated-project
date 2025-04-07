/*
  # Initial Schema Setup for ECOTRIO Cable Management

  1. New Tables
    - `technicians`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `created_at` (timestamp)
    
    - `cable_entries`
      - `id` (uuid, primary key)
      - `date` (date)
      - `apartment_cable` (integer)
      - `house_cable` (integer)
      - `pto_cable_white` (integer)
      - `pto_cable_black` (integer)
      - `technician_id` (uuid, references technicians)
      - `notes` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Technicians can only view and edit their own entries
    - Admins can view all entries
*/

-- Create technicians table
CREATE TABLE technicians (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create cable entries table
CREATE TABLE cable_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  apartment_cable integer NOT NULL DEFAULT 0,
  house_cable integer NOT NULL DEFAULT 0,
  pto_cable_white integer NOT NULL DEFAULT 0,
  pto_cable_black integer NOT NULL DEFAULT 0,
  technician_id uuid REFERENCES technicians NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE technicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE cable_entries ENABLE ROW LEVEL SECURITY;

-- Create policies for technicians table
CREATE POLICY "Technicians can view their own profile"
  ON technicians
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all technicians"
  ON technicians
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  );

-- Create policies for cable entries
CREATE POLICY "Technicians can view and edit their own entries"
  ON cable_entries
  FOR ALL
  TO authenticated
  USING (
    technician_id IN (
      SELECT id FROM technicians
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all entries"
  ON cable_entries
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  );
