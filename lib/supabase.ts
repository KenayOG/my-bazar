import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://grjahmmpfvosptbdytbg.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyamFobW1wZnZvc3B0YmR5dGJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwNjk3MzgsImV4cCI6MjA0NjY0NTczOH0._YtpguUDQ9Vo_FQU0B1phDYswt8xN16i661vIf4C-4Q";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
