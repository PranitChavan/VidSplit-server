import { createClient } from '@supabase/supabase-js';
import { Database } from '../models/supabase.types';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient<Database>(process.env.SUPABASE_URL, process.env.ANON_KEY);

export default supabase;
