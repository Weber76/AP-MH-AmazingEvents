/* Show categories */

let capturedCategories = document.getElementById("categories");

let categoriesElements = ``;

let categoriesExist = [];

for (let objectEvent of data.events) {
  if (
    categoriesExist.findIndex((cat) => {
      return cat == objectEvent.category;
    }) < 0
  ) {
    categoriesExist.push(objectEvent.category);
  }
}

categoriesExist = categoriesExist.sort();

for (let i = 0; i < categoriesExist.length; i++) {
  categoriesElements =
    categoriesElements +
    `
    <li class="check-slide">
      <input
        class="btn-check button-check"
        type="checkbox"
        id="${categoriesExist[i].toLowerCase().replace(" ", "_")}"
        name="category_${categoriesExist[i].toLowerCase().replace(" ", "_")}"
     ><label for="${categoriesExist[i]
       .toLowerCase()
       .replace(" ", "_")}" class="btn btn-outline-secondary"
        ><span class="label-chk"></span>${categoriesExist[i]}</label
      >
    </li>`;
}

capturedCategories.innerHTML = categoriesElements;
