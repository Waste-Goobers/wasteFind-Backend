/*   

  *importing recycle_Centers from "../utils / recycle_centers.json"
 */

const recycleCenters = require('../utils/recycle_centers.json');

/*   

  *importing zipcodesOfDistricts from "../utils /zipcodesOfDistricts.json"
 */

const zipcodesOfDistricts = require('../utils/zipcodesOfDistricts.json');



/**
 * Calculate Near Recycle Centers By Zipcode
 * @parmas zipcode
 * @returns arr []
 */
function calculateByZipcode(zipcode) {
  //TODO: Calculate
  const RecycleCentersAnkara = recycleCenters.ankara;
  const DistrictZipcodesAnkara = zipcodesOfDistricts;
  return filterByDistricts();

  function findDistrictOfZipcode(zipcode) {
    for (let district in DistrictZipcodesAnkara) {
      if (DistrictZipcodesAnkara[district].includes(zipcode)) {
        return district;
      }
    }
  }

  function filterByDistricts() {

    return RecycleCentersAnkara.filter(recycleCenter => recycleCenter.district == findDistrictOfZipcode(zipcode));

  }

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
