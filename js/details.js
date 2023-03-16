let hBar = document.querySelector(".aside-hbar");
let eventToPrint = data.events.find((currentObj) => {
  return currentObj._id == location.search.substring(1);
});
let articleDetails = document.getElementById("main-article-details");

const dateOfEvent = new Date(eventToPrint.date + "T12:00:00Z");
let textDateOfEvent = dateOfEvent.toLocaleString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

hBar.innerHTML = `<p class="navi-here flex-grow-1">${eventToPrint.name}</p>`;
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
        <p class="card-text">Price ${eventToPrint.price.toLocaleString(
          "en-US",
          { style: "currency", currency: "USD" }
        )}</p>
        <button
            onclick="window.history.back();"
            class="btn btn-primary btn-card"
            >Go Back...</button>
    </div>
  </div>
</div>`;

document.querySelector("title").innerHTML = `${eventToPrint.name} details`;
