/* filtra lo que obtuvimos según la fecha y la página que hace la llamada */

function filtrarJSON(capturedElement, capturedPage) {
  let dataBase = [];
  const dataToday = new Date(capturedElement.currentDate);
  const dataEvents = capturedElement.events;
  if (capturedPage == "/upcoming.html") {
    const dataFiltered = dataEvents.filter(
      (item) => new Date(item.date) > dataToday
    );
    dataBase = dataFiltered;
  } else if (capturedPage == "/past.html") {
    const dataFiltered = dataEvents.filter(
      (item) => new Date(item.date) < dataToday
    );
    dataBase = dataFiltered;
  } else if (capturedPage == "/index.html"){
    dataBase = dataEvents;
  }
  return dataBase;
}