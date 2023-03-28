let fetchURL = "https://mh.up.railway.app/api/amazing-events";
let pastFetchURL = fetchURL + "?time=past";
let upcomingFetchURL = fetchURL + "?time=upcoming";
let categoriesFetchURL = fetchURL + "?category=";

let highestEvents = [];
let categoriesPast = [];

let innerTablePast = ``;

async function eventsStatsFn() {
  try {
    let capturedElement = document.getElementById("eventsStatsBody");

    let dataEvents = await fetch(pastFetchURL).then((response) =>
      response.json()
    );

    let attendanceEvents = dataEvents.events.map((each) => {
      return {
        name: each.name,
        assistance: each.assistance,
        capacity: each.capacity,
        percentageAttendance: (each.assistance * 100) / each.capacity,
      };
    });

    attendanceEvents.sort(function (a, b) {
      return b.percentageAttendance - a.percentageAttendance;
    });

    highestEvents = attendanceEvents.map((each) => {
      return each;
    });

    attendanceEvents.sort(function (a, b) {
      return b.capacity - a.capacity;
    });

    innerTablePast = `
<tr>
  <td><p>${
    highestEvents[0].name
  }</p><p class="events-number">${highestEvents[0].percentageAttendance.toFixed(
      2
    )} %</p></td>
  <td><p>${
    highestEvents[highestEvents.length - 1].name
  }</p><p class="events-number">${highestEvents[
      highestEvents.length - 1
    ].percentageAttendance.toFixed(2)} %</p></td>
  <td><p>${
    attendanceEvents[0].name
  }</p><p class="events-number">${attendanceEvents[0].capacity.toLocaleString(
      "en-US"
    )} spectators</p></td>
</tr>`;

    capturedElement.innerHTML = innerTablePast;
  } catch (error) {
    console.log(error);
  }
}

eventsStatsFn();

async function upcomingEventsStats() {
  try {
    let innerTableUpcoming = ``;
    let categoriesUpcoming = [];

    let capturedElement = document.getElementById("upcomingStatsBody");

    let dataEvents = await fetch(upcomingFetchURL).then((response) =>
      response.json()
    );

    let sortByCategories = dataEvents.events.map((each) => {
      return {
        name: each.name,
        category: each.category,
        estimate: each.estimate,
        capacity: each.capacity,
        price: each.price,
      };
    });

    sortByCategories.sort(function (a, b) {
      let x = a.category.toLowerCase();
      let y = b.category.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });

    console.log(sortByCategories);

    let eventsCategories = sortByCategories.map((each) => {
      return each.category;
    });

    eventsCategories = new Set(eventsCategories);
    eventsCategories = Array.from(eventsCategories);

    console.log(eventsCategories);

    for (let objectEvent of sortByCategories) {
      if (categoriesUpcoming.length == 0) {
        categoriesUpcoming.push({
          name: objectEvent.category,
          revenue: objectEvent.estimate * objectEvent.price,
          estimate: objectEvent.estimate,
          capacity: objectEvent.capacity,
        });
      } else {
        if (
          categoriesUpcoming[categoriesUpcoming.length - 1].name ==
          objectEvent.category
        ) {
          categoriesUpcoming[categoriesUpcoming.length - 1] = {
            name: objectEvent.category,
            revenue:
              objectEvent.estimate * objectEvent.price +
              categoriesUpcoming[categoriesUpcoming.length - 1].revenue,
            estimate:
              objectEvent.estimate +
              categoriesUpcoming[categoriesUpcoming.length - 1].estimate,
            capacity:
              objectEvent.capacity +
              categoriesUpcoming[categoriesUpcoming.length - 1].capacity,
          };
        } else {
          categoriesUpcoming.push({
            name: objectEvent.category,
            revenue: objectEvent.estimate * objectEvent.price,
            estimate: objectEvent.estimate,
            capacity: objectEvent.capacity,
          });
        }
      }
    }

    for (let i = 0; i < categoriesUpcoming.length; i++) {
      innerTableUpcoming =
        innerTableUpcoming +
        `
        <tr>
        <td>
        <p>${categoriesUpcoming[i].name}</p>
        </td>
        <td>
        <p>&#36; ${categoriesUpcoming[i].revenue.toLocaleString("en-US")}</p>
        </td>
        <td>
        <p>${(
          (categoriesUpcoming[i].estimate * 100) /
          categoriesUpcoming[i].capacity
        ).toFixed(2)} %</p>
        </td>
        </tr>`;
    }

    capturedElement.innerHTML = innerTableUpcoming;
  } catch (error) {
    console.log(error);
  }
}

upcomingEventsStats();

async function pastEventsStats() {
  try {
    let sortByCategories = [];

    let innerTableUpcoming = ``;

    let capturedElement = document.getElementById("pastStatsBody");

    let dataEvents = await fetch(pastFetchURL).then((response) =>
      response.json()
    );

    for (let objectEvent of dataEvents.events) {
      sortByCategories.push({
        name: objectEvent.name,
        category: objectEvent.category,
        assistance: objectEvent.assistance,
        capacity: objectEvent.capacity,
        price: objectEvent.price,
      });
    }

    sortByCategories.sort(function (a, b) {
      let x = a.category.toLowerCase();
      let y = b.category.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });

    console.log(sortByCategories);

    categoriesUpcoming = [];

    for (let objectEvent of sortByCategories) {
      if (categoriesUpcoming.length == 0) {
        categoriesUpcoming.push({
          name: objectEvent.category,
          revenue: objectEvent.assistance * objectEvent.price,
          assistance: objectEvent.assistance,
          capacity: objectEvent.capacity,
        });
      } else {
        if (
          categoriesUpcoming[categoriesUpcoming.length - 1].name ==
          objectEvent.category
        ) {
          categoriesUpcoming[categoriesUpcoming.length - 1] = {
            name: objectEvent.category,
            revenue:
              objectEvent.assistance * objectEvent.price +
              categoriesUpcoming[categoriesUpcoming.length - 1].revenue,
            assistance:
              objectEvent.assistance +
              categoriesUpcoming[categoriesUpcoming.length - 1].assistance,
            capacity:
              objectEvent.capacity +
              categoriesUpcoming[categoriesUpcoming.length - 1].capacity,
          };
        } else {
          categoriesUpcoming.push({
            name: objectEvent.category,
            revenue: objectEvent.assistance * objectEvent.price,
            assistance: objectEvent.assistance,
            capacity: objectEvent.capacity,
          });
        }
      }
    }
    console.log(categoriesUpcoming);

    for (let i = 0; i < categoriesUpcoming.length; i++) {
      innerTableUpcoming =
        innerTableUpcoming +
        `
        <tr>
        <td>
        <p>${categoriesUpcoming[i].name}</p>
        </td>
        <td>
        <p>&#36; ${categoriesUpcoming[i].revenue.toLocaleString("en-US")}</p>
        </td>
        <td>
        <p>${(
          (categoriesUpcoming[i].assistance * 100) /
          categoriesUpcoming[i].capacity
        ).toFixed(2)} %</p>
        </td>
        </tr>`;
    }

    capturedElement.innerHTML = innerTableUpcoming;
  } catch (error) {
    console.log(error);
  }
}

pastEventsStats();
