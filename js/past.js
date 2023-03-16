let fetchURL = "https://mh.up.railway.app/api/amazing-events?time=past";

showCategories(fetchURL);

document
  .getElementById("search_bar")
  .addEventListener("keyup", refreshMainArticle);

window.addEventListener("load", refreshMainArticleTimeOut);

function refreshMainArticleTimeOut() {
  setTimeout(refreshMainArticle, 500);
}

function refreshMainArticle() {
  dataConsult(document.getElementById("main-article"), location.pathname);
}
