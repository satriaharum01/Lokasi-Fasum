/**
 * Ambil end point dan waypoints dari routeDataList
 * @param {Array} routeDataList - daftar titik tujuan (selain start point)
 * @returns {Object} { endPoint, waypoints }
 */
export function getWaypoints(routeDataList = []) {
    if (!Array.isArray(routeDataList) || routeDataList.length === 0) {
        return { endPoint: null, waypoints: [] };
    }

    // titik terakhir sebagai end point
    const endPoint = routeDataList[routeDataList.length - 1];

    // semua titik kecuali titik terakhir jadi waypoint
    const waypoints =
        routeDataList.length > 1
            ? routeDataList.slice(0, routeDataList.length - 1).map((point) => ({
                  location: {
                      lat: parseFloat(point.lat),
                      lng: parseFloat(point.lng),
                  },
                  stopover: true,
              }))
            : [];

    return { endPoint, waypoints };
}
