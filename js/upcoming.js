let capturedArticle = document.getElementById("main-article");
let cards = ``;
let currentDate = data.currentDate;

printCards(
  data.events.filter((currentObj) => {
    return currentObj.date >= currentDate;
  })
);
