import { supabase } from '../utils/supabase'

/**
 * Fetches all categories from Supabase
 * @returns {Promise<Array>} Array of category objects
 * @throws {Error} If the request fails or network is unavailable
 */
export async function getCategories() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')

    if (error) throw error
    return data
  } catch (err) {
    if (err.name === 'TypeError') {
      throw new Error('Kunde inte ansluta till servern. Kontrollera din internetanslutning.')
    }
    throw err
  }
}

/**
 * Fetches all cards from Supabase
 * @returns {Promise<Array>} Array of card objects
 * @throws {Error} If the request fails or network is unavailable
 */
export async function getCards() {
  try {
    const { data, error } = await supabase
      .from('cards')
      .select('*')

    if (error) throw error
    return data
  } catch (err) {
    if (err.name === 'TypeError') {
      throw new Error('Kunde inte ansluta till servern. Kontrollera din internetanslutning.')
    }
    throw err
  }
}