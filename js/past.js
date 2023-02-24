let capturedElement = document.getElementById("main-article");

let cards = ``;

let currentDate = data.currentDate;

for (let objectEvent of data.events) {
  if (objectEvent.date < currentDate) {
    let cardTemplate = `
        <div class="card">
          <img
            src="${objectEvent.image}"
            class="card-img-top"
            alt="${objectEvent.name}">
          <div class="card-body">
            <div>
              <h5 class="card-title">${objectEvent.name}</h5>
              <p class="card-text">${objectEvent.description}</p>
            </div>
            <div class="card-foot">
                <p class="card-text">Price &#36;${objectEvent.price}</p>
                <a href="#" class="btn btn-primary btn-card">View more...</a>
            </div>
          </div>
        </div>`;
    cards = cards + cardTemplate;
  }
}

capturedElement.innerHTML = cards;
