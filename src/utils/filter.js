export const filterFn = (sortedBy, filter, unsorted) => {
  let sorted;
  if (
    sortedBy !== filter + "-increase" &&
    (filter === "id" || filter === "albumId")
  ) {
    sorted = unsorted.sort((a, b) => a[filter] - b[filter]);
  } else if (filter === "id" || filter === "albumId") {
    sorted = unsorted.sort((a, b) => b[filter] - a[filter]);
  } else if (sortedBy !== filter + "-increase") {
    sorted = unsorted.sort((a, b) => a[filter].localeCompare(b[filter]));
  } else {
    sorted = unsorted.sort((a, b) => b[filter].localeCompare(a[filter]));
  }
  return sorted;
};
