// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ogchohsruoiqomaqhajh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nY2hvaHNydW9pcW9tYXFoYWpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMDU1NjUsImV4cCI6MjA5Nzc4MTU2NX0.e7oK3GQf2YTNYqru7rUE66YI7FmyPqbA6RUHdCgX1jo'

export const supabase = createClient(supabaseUrl, supabaseKey)