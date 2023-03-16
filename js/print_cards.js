function printCards(capturedElement, capturedPage, cardList) {
  let cards = ``;

  if (cardList.length > 0) {
    for (let cardEvent of cardList) {
      let cardTemplate = `
    <div class="card">
      <img
        src="${cardEvent.image}"
        class="card-img-top"
        alt="${cardEvent.name}">
      <div class="card-body">
        <div>
          <h5 class="card-title">${cardEvent.name}</h5>
          <p class="card-text">${cardEvent.description}</p>
        </div>
        <div class="card-foot">
            <p class="card-text">Price ${cardEvent.price.toLocaleString(
              "en-US",
              { style: "currency", currency: "USD" }
            )}</p>
            <a href="./details.html?${cardEvent.id}"
            target="i-frame"
            onclick="showModal()"
            class="btn btn-primary btn-card open-modal">View more...</a>
        </div>
      </div>
    </div>`;

      cards = cards + cardTemplate;
    }
  } else {
    cards = `
    <div class="card">
      <img
        src="./img/nothing.jpg"
        class="card-img-top"
        alt="Not found">
      <div class="card-body">
        <div>
          <h5 class="card-title">Nothing found</h5>
          <p class="card-text">No matching results for your search
           request. Please try another term or clear filter.</p>
        </div>
        <div class="card-foot">
            <p class="card-text">Sorry</p>
            <a href="${capturedPage}" class="btn btn-primary btn-card">Clear filter...</a>
        </div>
      </div>
    </div>`;
  }
  capturedElement.innerHTML = cards;
}
