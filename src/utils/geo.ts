export const crowDistance = (lat1, lon1, lat2, lon2, getKm = true) => {
  const p = 0.017453292519943295; // Math.PI / 180
  const c = Math.cos;
  const divisor = getKm ? 1 : 1.6;
  const a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  return (12742 * Math.asin(Math.sqrt(a))) / divisor; // 2 * R; R = 6371 km
};