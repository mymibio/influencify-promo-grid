
-- This SQL will be used to create storage buckets for user uploads
CREATE POLICY "Allow public access to profile pictures"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'profile_pictures');

CREATE POLICY "Only authenticated users can upload profile pictures"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'profile_pictures');

CREATE POLICY "Users can update their own profile pictures"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'profile_pictures' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can delete their own profile pictures"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'profile_pictures' AND (storage.foldername(name))[1] = auth.uid()::text);
