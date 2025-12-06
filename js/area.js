const areaBtn = document.querySelector(".area");
const areaSec = document.querySelector(".areaSec");
const rowArea = document.querySelector(".rowArea");
const rowAreaDetails = document.querySelector(".rowAreaDetails");

async function getAreaApi() {  // Function: Fetch list of areas/countries from API
  try {
    const resp = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );
    const data = await resp.json();
    const meals = data.meals;
    displayArea(meals);
    loadingScreen.classList.add("d-none");
  } catch (error) {
    console.log(error);
  }

  function displayArea(data) { // Function: Display all areas as cards and add click event
  let content = "";
  for (let meal of data) {
    content += ` 
                <div class=" col-12 col-md-4 col-lg-3">
              <div class="card card-details position-relative rounded-3 d-flex flex-column align-items-center text-center" data-id="${meal.strArea}">
                <img src="./img/food-cover.png"  width="40px" alt="meal-area-pic">
               <h4 class="text-black fw-bold">${meal.strArea}</h4>
          </div>
        </div>
     `;
  }
  rowArea.innerHTML = content;
  document.querySelectorAll(".card-details").forEach((card) => {
    card.addEventListener("click", function () {
      const cardId = card.dataset.id;
      homeSec.classList.add("d-none");
      cardSec.classList.add("d-none");
      displayAreaMeals(cardId);
    });
  });
}

async function displayAreaMeals(area) { // Function: Fetch and show meals for a selected area
  try {
    const resp = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );
    const data = await resp.json();
    const meals = data.meals;

    let content = "";

    for (let meal of meals) {
      content += `
        <div class="col-12 col-md-4 col-lg-3">
          <div class="card card-M rounded-3" data-id="${meal.idMeal}">
            <img src="${meal.strMealThumb}" class="rounded-3" alt="meal-area">
            <h5 class="text-center mt-2">${meal.strMeal}</h5>
          </div>
        </div>
      `;
    }
    rowAreaDetails.innerHTML = content;
    cardSec.classList.add("d-none");
    rowArea.classList.add("d-none");

    rowAreaDetails.querySelectorAll(".card-M").forEach((card) => {
      card.addEventListener("click", function () {
        const cardId = card.dataset.id;
        getMealDetails(cardId);
        cardSec.classList.remove("d-none");
        rowArea.classList.add("d-none");
        rowAreaDetails.classList.add("d-none");
      });
    });
  } catch (error) {
    console.log(error);
  }
}

}


import { getMealDetails , cardSec , homeSec } from "./main.js";
export {areaBtn , areaSec , getAreaApi , rowArea , rowAreaDetails}



