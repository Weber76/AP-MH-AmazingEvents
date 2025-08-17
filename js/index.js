let pageEvents = [];

async function initializePage() {
  const datosEventos = await consultarJSON();
  pageEvents = filtrarJSON(datosEventos, location.pathname);

  showCategories(pageEvents); // muestra las categorías
  refreshMainArticle(); // muestra las cards por primera vez
}

initializePage();

document
  .getElementById("search_bar")
  .addEventListener("keyup", refreshMainArticle);

function refreshMainArticle() {
  dataConsult(
    document.getElementById("main-article"),
    location.pathname,
    pageEvents
  );
}