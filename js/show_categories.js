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
        class="btn-check"
        type="checkbox"
        id="cinema"
        name="category_cinema"
        checked
     ><label for="cinema" class="btn btn-outline-secondary"
        ><span class="label-chk"></span>${categoriesExist[i]}</label
      >
    </li>`;
}

capturedCategories.innerHTML = categoriesElements;
