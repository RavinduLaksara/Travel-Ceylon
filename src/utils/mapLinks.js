/**
 * Generate a Google Maps URL for a given location
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {string} name - Place name for the label
 * @returns {string} Google Maps URL
 */
export function getGoogleMapsUrl(lat, lon, name) {
  const encodedName = encodeURIComponent(name);
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lon}&query_place_id=${encodedName}`;
}

/**
 * Generate a geo: URI for native map app deep linking
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {string} name - Place name label
 * @returns {string} geo: URI
 */
export function getGeoUri(lat, lon, name) {
  const encodedName = encodeURIComponent(name);
  return `geo:${lat},${lon}?q=${lat},${lon}(${encodedName})`;
}
