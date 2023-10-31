
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://dbbaiywxedujcahdnxru.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRiYmFpeXd4ZWR1amNhaGRueHJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc1OTIwNTgsImV4cCI6MjAxMzE2ODA1OH0.nifZe1Lxk8M_S2mI3MGzW7xAMcQ7GZunpsreyhpaFuo"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase