/* devuelve un objeto JSON desde un archivo JSON */

async function consultarJSON() {
  let dataBase = [];
  try {
    const fetchURL = "./js/amazing.json";
    dataBase = await fetch(fetchURL).then((response) => response.json());
    /*-- Otra forma de hacerlo --*/
    /* const response = await fetch(fetchURL);
       dataBase = await response.json(); */
  } catch (error) {
    console.log(error);
  }
  return dataBase;
}