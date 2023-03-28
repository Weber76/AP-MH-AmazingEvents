async function dataConsult(capturedElement, capturedPage) {
    try {
      /* check array */
      let searchChecks = Array.from(
        document.querySelectorAll(".button-check:checked"),
        (currentObj) => currentObj.id
      );
  
      /* search box */
      let searchText = document
        .getElementById("search_bar")
        .value.toLowerCase()
        .trim()
        .split(" ");
  
      let fetchURL = "";
  
      if (capturedPage == "/upcoming.html") {
        fetchURL = "https://mh.up.railway.app/api/amazing-events?time=upcoming";
      } else if (capturedPage == "/past.html") {
        fetchURL = "https://mh.up.railway.app/api/amazing-events?time=past";
      } else {
        fetchURL = "https://mh.up.railway.app/api/amazing-events";
      }
  
      let dataEvents = await function () {
        return fetch(fetchURL);
      };
  
      searchResult = await dataEvents.JSON.filter((currentObj) => {
        return (
          (searchChecks.length === 0 ||
            searchChecks.includes(
              currentObj.category.toLowerCase().replace(" ", "_")
            )) &&
          searchText.every((textSearch) =>
            (
              currentObj.name.toLowerCase() +
              " " +
              currentObj.description.toLowerCase()
            ).includes(textSearch)
          )
        );
      });
  
      printCards(capturedElement, capturedPage, searchResult);
    } catch (error) {
      console.log("An error ocurred.");
      console.log(error);
    }
  }

  async function getData (){
    try{
await fetch ("https://mh.up.railway.app/api/amazing-events")
    }catch (error){
console.log(error)
    }
  }