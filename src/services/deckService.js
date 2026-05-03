import { supabase } from '../utils/supabase';

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*');

  if (error) throw error;
  return data;
}

export async function getCards() {
  const { data, error } = await supabase
    .from('cards')
    .select('*');

  if (error) throw error;
  return data;
}