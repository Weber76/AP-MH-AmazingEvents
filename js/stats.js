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
        revenue: each.estimate * each.price,
        attendance: (each.estimate * 100) / each.capacity,
      };
    });

    let eventsCategories = sortByCategories.map((each) => {
      return each.category;
    });

    eventsCategories = new Set(eventsCategories);
    eventsCategories = Array.from(eventsCategories).sort(function (a, b) {
      let x = a.toLowerCase();
      let y = b.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });

    console.log(eventsCategories);

    console.log(sortByCategories);

    eventsCategories.forEach((element) => {
      console.log("Categoría :" + element);
      categoriesUpcoming.push(
        sortByCategories
          .filter((each) => {
            return each.category == element;
          })
          .reduce((each, actual, index) => {
            return {
              name: actual.category,
              estimate: actual.estimate + each.estimate,
              capacity: actual.capacity + each.capacity,
              revenue: actual.revenue + each.revenue,
              attendance: actual.attendance + each.attendance,
              count: index + 1,
            };
          })
      );
    });

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
          categoriesUpcoming[i].attendance / categoriesUpcoming[i].count
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
    let innerTableUpcoming = ``;
    let categoriesUpcoming = [];

    let capturedElement = document.getElementById("pastStatsBody");

    let dataEvents = await fetch(pastFetchURL).then((response) =>
      response.json()
    );

    let sortByCategories = dataEvents.events.map((each) => {
      return {
        name: each.name,
        category: each.category,
        assistance: each.assistance,
        capacity: each.capacity,
        price: each.price,
        revenue: each.assistance * each.price,
        attendance: (each.assistance * 100) / each.capacity,
      };
    });

    let eventsCategories = sortByCategories.map((each) => {
      return each.category;
    });

    eventsCategories = new Set(eventsCategories);
    eventsCategories = Array.from(eventsCategories).sort(function (a, b) {
      let x = a.toLowerCase();
      let y = b.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });

    console.log(eventsCategories);

    console.log(sortByCategories);

    eventsCategories.forEach((element) => {
      console.log("Categoría :" + element);
      categoriesUpcoming.push(
        sortByCategories
          .filter((each) => {
            return each.category == element;
          })
          .reduce((each, actual, index) => {
            return {
              name: actual.category,
              assistance: actual.assistance + each.assistance,
              capacity: actual.capacity + each.capacity,
              revenue: actual.revenue + each.revenue,
              attendance: actual.attendance + each.attendance,
              count: index + 1,
            };
          })
      );
    });

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
          categoriesUpcoming[i].attendance / categoriesUpcoming[i].count
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
