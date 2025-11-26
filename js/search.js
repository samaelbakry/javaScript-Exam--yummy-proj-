const searchBtn = document.querySelector(".search");
const searchSec = document.querySelector(".searchSec");
const nameInput = document.querySelector(".searchByN");
const letterInput = document.querySelector(".searchByL");

function searchLetter() { // Function: Get search input by first letter and call API
  const mealFirstL = letterInput.value.trim();
  getLetter(mealFirstL);
}
async function getLetter(value) { // Function: Fetch meals by first letter and display results
  try {
    const resp = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`
    );
    const finalRes = await resp.json();
    const meals = finalRes.meals;
    if (meals) {
      let content = "";
      for (let meal of meals) {
        content += `
        <div class="col-12 col-md-4 col-lg-3">
            <div class="card card-details position-relative rounded-3" data-id="${meal.idMeal}">
                <img src="${meal.strMealThumb}" class="rounded-3" alt="meal-img">
                <div class="layer position-absolute d-flex justify-content-center align-items-center bg-white bg-opacity-75 top-0 start-0 end-0 bottom-0">
                    <h4 class="text-black fw-bold">${meal.strMeal}</h4>
                </div>
            </div>
        </div>`;
      }
      searchSec.querySelector(".rowSearch").innerHTML = content;

      searchSec.querySelectorAll(".card-details").forEach((card) => {
        card.addEventListener("click", function () {
          const cardId = card.dataset.id;
          getMealDetails(cardId);
          searchSec.classList.add("d-none");
        });
      });
    } else {
      searchSec.querySelector(".rowSearch").innerHTML =
        "<p class='text-black fw-bold'>No meals found</p>";
    }
  } catch (error) {
    console.log(error);
  }
}

function searchName() {// Function: Get search input by name and call API
  const mealN = nameInput.value.trim();
  getName(mealN);
}

async function getName(value) { // Function: Fetch meals by name and display search results
  try {
    const resp = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`
    );
    const finalRes = await resp.json();
    const meals = finalRes.meals;

    if (meals) {
      let content = "";
      for (let meal of meals) {
        content += `
        <div class="col-12 col-md-4 col-lg-3">
            <div class="card card-details position-relative rounded-3" data-id="${meal.idMeal}">
                <img src="${meal.strMealThumb}" class="rounded-3" alt="meal-img">
                <div class="layer position-absolute d-flex justify-content-center align-items-center bg-white bg-opacity-75 top-0 start-0 end-0 bottom-0">
                    <h4 class="text-black fw-bold">${meal.strMeal}</h4>
                </div>
            </div>
        </div>`;
      }
      searchSec.querySelector(".rowSearch").innerHTML = content;

      searchSec.querySelectorAll(".card-details").forEach((card) => {
        card.addEventListener("click", function () {
          const cardId = card.dataset.id;
          getMealDetails(cardId);
          searchSec.classList.add("d-none");
        });
      });
    } else {
      searchSec.querySelector(".rowSearch").innerHTML =
        "<p class='text-black fw-bold'>No meals found</p>";
    }
  } catch (error) {
    console.log(error);
  }
}

export {getLetter , getName , searchBtn , searchSec , searchLetter , searchName , nameInput , letterInput }
import {getMealDetails} from "./main.js";