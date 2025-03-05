import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://cvfejpcvnhyymutwnnaf.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2ZmVqcGN2bmh5eW11dHdubmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1ODA0OTksImV4cCI6MjA1NDE1NjQ5OX0.aRU6I4Al9FSaNBKC0aFardBPEurZn-rvbzfGx1xHCbo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
