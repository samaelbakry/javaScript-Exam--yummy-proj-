const categoresBtn = document.querySelector(".categores");
const categorySec = document.querySelector(".categorySec");
const cateDetails = document.querySelector(".rowCateDetails");
const rowCate = document.querySelector(".rowCate");

async function getCategoryApi() {
  try {
    const resp = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const data = await resp.json();
    displayCategory(data.categories);
  } catch (error) {
    console.log(error);
  }

  function displayCategory(data) {// Function: Display category cards and add click event
  let content = "";
  for (let meal of data) {
    content += ` 
                <div class=" col-12 col-md-4 col-lg-3">
           <div class="card card-details position-relative rounded-3" data-id="${
             meal.strCategory
           }" >
            <img src=${meal.strCategoryThumb} class="rounded-3" alt="meal-img">
            <div
              class="layer position-absolute d-flex flex-column justify-content-center align-items-center bg-white bg-opacity-75 top-0 start-0 end-0 bottom-0">
              <h4 class="text-black fw-bold">${meal.strCategory}</h4>
              <p class="text-black">${meal.strCategoryDescription
                .slice(0, 30)
                .split(" ")
                .join(" ")}</p>
            </div>
          </div>
        </div>
     `;
  }
   rowCate.innerHTML = content;
    document.querySelectorAll(".card-details").forEach((card) => {
    card.addEventListener("click", function () {
      const cardId = card.dataset.id;
      rowCate.classList.add("d-none");
      cardSec.classList.add("d-none")
      displayCatDetails(cardId);
    });
  });
   
}

async function displayCatDetails(categoryName) {// Function: Fetch meals inside a specific category and display them
  try {
    const resp = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
    );
    const data = await resp.json();
    const meals = data.meals;
    let content = "";

    for (let meal of meals) {
      content += `
        <div class="col-12 col-md-4 col-lg-3">
          <div class="card card-M rounded-3" data-id="${meal.idMeal}">
            <img src="${meal.strMealThumb}" class="rounded-3" alt="meal-category">
            <h5 class="text-center mt-2">${meal.strMeal}</h5>
          </div>
        </div>
      `;
    }
    cateDetails.innerHTML = content;
        cateDetails.querySelectorAll(".card-M").forEach((card) => {
        card.addEventListener("click", function () {
        const cardId = card.dataset.id;
        getMealDetails(cardId);
        cardSec.classList.remove("d-none");
        cateDetails.classList.add("d-none");
        rowCate.classList.add("d-none");
      });
    });
  
  } catch (error) {
    console.log(error);
  }
    
}

}

export{categoresBtn , categorySec , getCategoryApi , rowCate , cateDetails}
import { cardSec , getMealDetails , homeSec } from "./main.js";






