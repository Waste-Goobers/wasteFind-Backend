/**
 * Calculate Near Recycle Centers By Zipcode
 * @parmas zipcode
 * @returns arr []
 */
function calculateByZipcode(zipcode) {
  //TODO: Calculate
  return [
    {
      id: 1,
      name: 'Arda Metal',
      cordinates: { lat: -33.8599358, lng: 151.2090295 },
      type: ['metal', 'paper'],
    },
  ];
}

/**
 * Calculate Near Recycle Centers By Location
 * @parmas location
 * @returns arr []
 */
function calculateByLocation(location) {
  //TODO: Calculate
  return [
    {
      id: 1,
      name: 'Arda Metal',
      cordinates: { lat: -33.8599358, lng: 151.2090295 },
      type: ['metal', 'paper'],
    },
  ];
}

module.exports = {
  calculateByLocation,
  calculateByZipcode,
};
