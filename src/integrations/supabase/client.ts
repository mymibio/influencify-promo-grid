// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://sgnjcqktsekrrqxxxtbe.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnbmpjcWt0c2VrcnJxeHh4dGJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyNTY4ODUsImV4cCI6MjA1ODgzMjg4NX0.LiNJSaKIpz9vvdRVIwk_KK_4j5U9k7HVNb2XvfRm7Tw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);