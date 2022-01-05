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
 * @params zipcode
 * @returns arr []
 */
function calculateByZipcode(zipcode) {
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
    return RecycleCentersAnkara.filter(
      (recycleCenter) =>
        recycleCenter.district == findDistrictOfZipcode(zipcode)
    );
  }
}

/**
 * Calculate Near Recycle Centers By Location
 * @params location
 * @returns arr []
 */
function calculateByLocation(location, type) {
  const filtered = filterByMaterial(recycleCenters.ankara, type);

  const filteredWithDist = filtered.map((rc) => ({
    ...rc,
    distance: calcDistBy2Dot(location, rc.location),
  }));
  return filteredWithDist.reduce((prev, curr) => {
    return prev.distance < curr.distance ? prev : curr;
  });
}
/**
 * Filters Recycle Centers By Material Type
 * @params location
 * @returns arr []
 */
function filterByMaterial(recycle_centers, type) {
  return recycle_centers.filter((rc) => {
    if (rc.type.includes(type)) {
      return rc;
    }
  });
}

/**
 * Calculates Distance Between Two Cordinates
 * @params cordinates
 * @returns distance value
 */
function calcDistBy2Dot(cordA, cordB) {
  return Math.sqrt(
    Math.pow(cordA.lat - cordB.lat, 2) + Math.pow(cordA.lng - cordB.lng, 2)
  );
}

module.exports = {
  calculateByLocation,
  calculateByZipcode,
};
