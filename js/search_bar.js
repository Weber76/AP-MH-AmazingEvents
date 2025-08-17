/* filtra el objeto JSON que obtuvimos de filter.js
   según las categorías indicadas y el contenido del cuadro de búsqueda
   para luego crear las 'cards' con lo que devuelve */

function dataConsult(capturedElement, capturedPage, dBEvents) {
  
  /* categorías */
  let searchChecks = Array.from(
    document.querySelectorAll(".button-check:checked"),
    (currentObj) => currentObj.id
  );

  /* cuadro de búsqueda */
  let searchText = document
    .getElementById("search_bar")
    .value.toLowerCase()
    .trim()
    .split(" ");

  /* filtramos */
  const filteredEvents = dBEvents.filter((currentObj) => {
    return (
      (searchChecks.length === 0 ||
        searchChecks.includes(
          currentObj.category.toLowerCase().replace(" ", "_")
        )) &&
      searchText.every((textSearch) =>
        (
          currentObj.name.toLowerCase() +
          " " +
          currentObj.description.toLowerCase()
        ).includes(textSearch)
      )
    );
  });

  /* creamos las cards */
  printCards(capturedElement, capturedPage, filteredEvents);
}