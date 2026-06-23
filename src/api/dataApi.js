import axios from 'axios';

/**
 * Fetch attractions by category.
 * Uses a robust local curated JSON file containing famous Sri Lankan destinations.
 *
 * @param {string} category - Filter category: 'all', 'hotels', 'nature', 'historical'
 * @returns {Promise<Array>} Array of attraction objects
 */
export async function fetchAttractions(category = 'all') {
  try {
    const response = await axios.get('/data/attractions.json', {
      responseType: 'json',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    const allAttractions = response.data;
    
    if (!Array.isArray(allAttractions)) {
      console.error('Expected an array of attractions, but received:', typeof allAttractions);
      throw new Error('Invalid data format received from server (not an array). Please restart the dev server.');
    }
    
    if (category === 'all') {
      return allAttractions;
    }
    
    return allAttractions.filter((a) => a.category === category);
  } catch (error) {
    console.error('Failed to fetch attractions from local data:', error.message);
    throw new Error('Could not load attractions data. Try restarting the development server.');
  }
}

/**
 * Fetch detailed information for a single attraction by its ID.
 *
 * @param {string} id - The attraction ID
 * @returns {Promise<Object>} Detailed attraction object
 */
export async function fetchAttractionDetails(id) {
  try {
    const response = await axios.get('/data/attractions.json', {
      responseType: 'json',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    const allAttractions = response.data;
    
    if (!Array.isArray(allAttractions)) {
      throw new Error('Invalid data format received from server (not an array).');
    }
    
    const attraction = allAttractions.find((a) => a.id === id);
    if (!attraction) {
      throw new Error(`Attraction with ID ${id} not found.`);
    }
    
    return attraction;
  } catch (error) {
    console.error(`Error fetching attraction ${id}:`, error.message);
    throw new Error('Could not load attraction details. Try restarting the development server.');
  }
}
