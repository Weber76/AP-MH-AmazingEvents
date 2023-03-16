document
  .getElementById("search_bar")
  .addEventListener("keyup", refreshMainArticle);

document.querySelectorAll("input.button-check").forEach((currentObj) => {
  currentObj.addEventListener("change", refreshMainArticle);
});

window.addEventListener("load", refreshMainArticleTimeOut);

function refreshMainArticleTimeOut() {
  setTimeout(refreshMainArticle, 500);
}

function refreshMainArticle() {
  let searchChecks = Array.from(
    document.querySelectorAll(".button-check:checked"),
    (currentObj) => currentObj.id
  );

  let searchText = document
    .getElementById("search_bar")
    .value.toLowerCase()
    .trim()
    .split(" ");

  let currentPage = location.pathname;

  let currentDate = data.currentDate;

  if (currentPage == "/upcoming.html") {
    dataEvents = data.events.filter((currentObj) => {
      return currentObj.date >= currentDate;
    });
  } else if (currentPage == "/past.html") {
    dataEvents = data.events.filter((currentObj) => {
      return currentObj.date < currentDate;
    });
  } else {
    dataEvents = data.events;
  }

  searchResult = dataEvents.filter((currentObj) => {
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

  printCards(searchResult);
}
