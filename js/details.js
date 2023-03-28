let fetchURL = "https://mh.up.railway.app/api/amazing-events";
let idDetail = location.search.substring(1);
let articleDetails = document.getElementById("main-article-details");

async function detailCard() {
  try {
    let eventToPrint = await fetch(fetchURL);
    eventToPrint = await eventToPrint.json();
    eventToPrint = await eventToPrint.events;
    eventToPrint = await eventToPrint.find((currentObj) => {
      return currentObj.id == idDetail;
    });

    const dateOfEvent = new Date(eventToPrint.date);
    let textDateOfEvent = dateOfEvent.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    articleDetails.innerHTML = `
<div class="card details-card">
  <img
    src="${eventToPrint.image}"
    class="card-img-top"
    alt="${eventToPrint.name}">
  <div class="card-body">
    <div class="card-main">
      <h5 class="card-title">${eventToPrint.name}</h5>
      <p class="card-text">${eventToPrint.description}</p>
      <p class="card-date"><i class="bi bi-calendar3"></i> ${textDateOfEvent}</p>
      <p class="card-category">Event Category: ${eventToPrint.category}</p>
      <p class="card-place">Event Place: ${eventToPrint.place}</p>
      <p class="card-capacity">Event Capacity Limited to: ${eventToPrint.capacity.toLocaleString(
        "en-US"
      )} spectators.</p>
    </div>
    <div class="card-foot">
        <p class="price">Price ${eventToPrint.price.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}</p>
    </div>
  </div>
</div>`;

    document.querySelector("title").innerHTML = `${eventToPrint.name} details`;
  } catch (error) {
    console.log(error);
  }
}

detailCard();
