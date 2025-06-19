import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rwpwbgnnxbdlhuswbevu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3cHdiZ25ueGJkbGh1c3diZXZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMzkyNzAsImV4cCI6MjA2NDgxNTI3MH0.NgDrmxtSOw4vJFTuK9zYx8VBOCTtB0_ZQYTNgsx_s-s';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});