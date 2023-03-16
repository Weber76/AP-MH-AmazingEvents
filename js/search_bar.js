async function dataConsult(capturedElement, capturedPage) {
  try {
    let fetchURL = "https://mh.up.railway.app/api/amazing-events";

    /* check array */

    let searchChecks = Array.from(
      document.querySelectorAll(".button-check:checked"),
      (currentObj) => currentObj.id
    );

    /* search box */
    let searchText = document
      .getElementById("search_bar")
      .value.toLowerCase()
      .trim()
      .split(" ");

    if (capturedPage == "/upcoming.html") {
      fetchURL = "https://mh.up.railway.app/api/amazing-events?time=upcoming";
    } else if (capturedPage == "/past.html") {
      fetchURL = "https://mh.up.railway.app/api/amazing-events?time=past";
    }

    let dataEvents = await fetch(fetchURL);
    dataEvents = await dataEvents.json();
    dataEvents = await dataEvents.events;
    dataEvents = await dataEvents.filter((currentObj) => {
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

    printCards(capturedElement, capturedPage, dataEvents);
  } catch (error) {
    console.log("An error ocurred.");
    console.log(error);
  }
}
