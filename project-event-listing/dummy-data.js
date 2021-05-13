export function getFeaturedEvents(data) {
  return data.filter((event) => event.isFeatured);
}

export function getAllEvents(data) {
  return data;
}

export function getFilteredEvents(dateFilter) {
  const { year, month, data } = dateFilter;

  let filteredEvents = data.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}

export function getEventById(id, data) {
  console.log(id);
  console.log(data);
  return data.find((event) => event.id === id);
}
