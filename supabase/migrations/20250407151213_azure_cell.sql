/*
  # Update technicians table RLS policies

  1. Changes
    - Add policy for inserting new technicians during registration
    - Update existing policies for better access control

  2. Security
    - Enable RLS on technicians table
    - Add policy for inserting new technicians
    - Update policies for viewing technicians
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can view all technicians" ON technicians;
DROP POLICY IF EXISTS "Technicians can view their own profile" ON technicians;

-- Create new policies
CREATE POLICY "Enable insert for authenticated users only" 
ON technicians FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable read access for authenticated users" 
ON technicians FOR SELECT 
TO authenticated 
USING (
  auth.uid() = user_id OR 
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.raw_user_meta_data->>'role' = 'admin'
  )
);

CREATE POLICY "Enable update for users based on user_id" 
ON technicians FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
