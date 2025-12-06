
const ingredientsBtn = document.querySelector(".ingredients");
const ingredientsSec = document.querySelector(".ingredientsSec");
const rowIngreSec = document.querySelector(".rowIngreSec");
const rowIngDetails = document.querySelector(".rowIngDetails");

async function getIngredients() {// Function: Fetch list of ingredients from API
  try {
    const resp = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
    );
    const data = await resp.json();
    const meals = data.meals;
    displayIngredients(meals);
  } catch (error) {
    console.log(error);
  }

  function displayIngredients(data) {// Function: Fetch and show meals that use a specific ingredient
  let content = "";
  for (let meal of data) {
    const imgUrl = `https://www.themealdb.com/images/ingredients/${meal.strIngredient}.png`;
    content += ` 
        <div class="col-12 col-md-4 col-lg-3">
          <div class="card card-details rounded-3" data-id ="${
            meal.strIngredient
          }">
            <img src="${imgUrl}" class="rounded-3" alt="ingredients-img">
            <h5 class="text-center mt-2">${meal.strIngredient}</h5>
            <p>${
              meal.strDescription
                ? meal.strDescription.slice(0, 60)
                : "No description"
            } </p>
          </div>
        </div>
      `;
  }
  rowIngreSec.innerHTML = content;
  document.querySelectorAll(".card-details").forEach((card) => {
    card.addEventListener("click", function () {
      const cardId = card.dataset.id;
      homeSec.classList.add("d-none");
      cardSec.classList.add("d-none");
      displayIngDetails(cardId);
    });
  });
}

async function displayIngDetails(ingreName) {
  try {
    const resp = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingreName}`
    );
    const data = await resp.json();
    const meals = data.meals;

    let content = "";
    for (let meal of meals) {
      content += `
        <div class="col-12 col-md-4 col-lg-3">
          <div class="card  card-M rounded-3" data-id ="${meal.idMeal}">
            <img src="${meal.strMealThumb}" class="rounded-3" alt="ing-img">
            <h5 class="text-center mt-2">${meal.strMeal}</h5>
          </div>
        </div>
      `;
    }
    rowIngDetails.innerHTML = content;
    rowIngreSec.classList.add("d-none");
    rowIngDetails.querySelectorAll(".card-M").forEach((card) => {
      card.addEventListener("click", function () {
        const cardId = card.dataset.id;
        getMealDetails(cardId);
        cardSec.classList.remove("d-none");
        rowIngDetails.classList.add("d-none");
        rowIngreSec.classList.add("d-none");
      });
    });
  } catch (error) {
    console.log(error);
  }
}

}


import { homeSec ,cardSec , getMealDetails } from "./main.js";
export { ingredientsBtn , ingredientsSec , getIngredients}