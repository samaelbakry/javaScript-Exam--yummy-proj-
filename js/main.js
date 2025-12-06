//^ home main elements
const cardSec = document.querySelector(".details");
const homeSec = document.querySelector(".rowData");
const homeLogo = document.querySelector(".wrap")
const loadingScreen = document.querySelector(".loading-screen");

async function callApi() {
  // Fetch all meals from API and display them on home section
  try {
    loadingScreen.classList.remove("d-none");
    const resp = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s="
    );
    const data = await resp.json();

    getAllMeals(data.meals);
    loadingScreen.classList.add("d-none");
  } catch (error) {
    console.log(error);
    console.log("something went wrong");
  }
}
callApi();

homeLogo.addEventListener("click",function(){
  hideAllSections()
  homeSec.classList.remove("d-none")
  
})

function getAllMeals(data) {// Display all meals as cards and add click event to open details
  let content = "";

  for (let meal of data) {
    content += ` 
                <div class=" col-12 col-md-4 col-lg-3">
          <div class="card card-details position-relative rounded-3" data-id="${meal.idMeal}" >
            <img src=${meal.strMealThumb} class="rounded-3" alt="meal-img">
            <div
              class="layer position-absolute d-flex justify-content-center align-items-center bg-white bg-opacity-75 top-0 start-0 end-0 bottom-0">
              <h4 class="text-black fw-bold">${meal.strMeal}</h4>
            </div>
          </div>
        </div>
     `;
  }
  homeSec.innerHTML = content;
  document.querySelectorAll(".card-details").forEach((card) => {
    card.addEventListener("click", function () {
      const cardId = card.dataset.id;
      getMealDetails(cardId);
    });
  });
}

export async function getMealDetails(id) { // Fetch full details of a meal by ID and show details section
  try {
    const details = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const allDetails = await details.json();
    const meal = allDetails.meals[0];
    homeSec.classList.add("d-none");
    cardSec.classList.remove("d-none");
    document.querySelector(".rowDetails").innerHTML = `
       <div class="col-12 col-md-6 d-flex justify-content-center">
          <img src="${
            meal.strMealThumb
          }" class="w-100 m-0 rounded-3"  alt="meal-img">
        </div>
        <div class="col-12 col-md-6">
          <h2 class="fw-bold">${meal.strMeal}</h2>
          <h3>Instructions</h3>
          <p>${meal.strInstructions.slice(0, 300).split(" ").join(" ")}</p>
          <h4>area: ${meal.strArea}</h4>
          <h4>Category: ${meal.strCategory}</h4>

         <div class="d-flex flex-md-row flex-wrap gap-2">
           <span class="badge text-bg-secondary">${meal.strIngredient1}</span>
          <span class="badge text-bg-secondary">${meal.strIngredient2}</span>
          <span class="badge text-bg-secondary">${meal.strIngredient3}</span>
          <span class="badge text-bg-secondary">${meal.strIngredient4}</span>
          <span class="badge text-bg-secondary">${meal.strIngredient5}</span>
          <span class="badge text-bg-secondary">${meal.strIngredient6}</span>
          <span class="badge text-bg-secondary">${meal.strIngredient7}</span>
          <span class="badge text-bg-secondary">${meal.strIngredient8}</span>
          <span class="badge text-bg-secondary">${meal.strIngredient9}</span>
           <span class="badge text-bg-secondary">${meal.strMeasure1}</span>
          <span class="badge text-bg-secondary">${meal.strMeasure2}</span>
          <span class="badge text-bg-secondary">${meal.strMeasure3}</span>
          <span class="badge text-bg-secondary">${meal.strMeasure4}</span>
          <span class="badge text-bg-secondary">${meal.strMeasure5}</span>
          <span class="badge text-bg-secondary">${meal.strMeasure6}</span>
          <span class="badge text-bg-secondary">${meal.strMeasure7}</span>
          <span class="badge text-bg-secondary">${meal.strMeasure8}</span>

         </div>
        
          <h4>tags: ${meal.strTags}</h4>
          
          <button class="btn btn-outline-warning me-2 mt-2 fw-bold" onclick="window.open('${
            meal.strSource
          }', '_blank')"><i class="fa-solid fa-link m-1"></i>Source</button>
          <button class="btn btn-outline-danger me-2 mt-2 fw-bold" onclick="window.open('${
            meal.strYoutube
          }', '_blank')"><i class="fa-brands fa-youtube m-1"></i>Youtube</button>
         
        </div>

`;
  } catch (error) {
    console.log(error);
    console.log("something went wrong");
  }
}

function hideAllSections() {
  // Function: Hide all main sections before showing another section
  homeSec.classList.add("d-none");
  searchSec.classList.add("d-none");
  categorySec.classList.add("d-none");
  areaSec.classList.add("d-none");
  ingredientsSec.classList.add("d-none");
  cardSec.classList.add("d-none");
  contactSec.classList.add("d-none");
}
//===========search api section=========//
searchBtn.addEventListener("click", function () {
  hideAllSections();
  searchSec.classList.remove("d-none");
});
nameInput.addEventListener("input", searchName);

letterInput.addEventListener("change", searchLetter);

import {searchBtn , searchSec , nameInput , letterInput , searchLetter , searchName } from "./search.js"

//===========category api section=========//

import { getCategoryApi , categoresBtn , categorySec } from "./category.js";
export {cardSec , homeSec}

categoresBtn.addEventListener("click" , function(){
  hideAllSections()
  categorySec.classList.remove("d-none")
})

getCategoryApi()

//===========Area api section=========//
import {areaBtn , areaSec , getAreaApi } from "./area.js"

areaBtn.addEventListener("click", function () {
  hideAllSections();
  areaSec.classList.remove("d-none");
});

getAreaApi()

//===========ingredients api section=========//

import{ingredientsBtn , ingredientsSec , getIngredients } from "./ingredients.js"

ingredientsBtn.addEventListener("click", function () {
  hideAllSections();
  ingredientsSec.classList.remove("d-none");
});

getIngredients()

//===========validation section=========//
contactUsBtn.addEventListener("click", function () {
  hideAllSections();
  contactSec.classList.remove("d-none");
});

submitBtn.addEventListener("click", function () {
  // Function: Save contact form data to localStorage
  const userData = {
    name: document.querySelector(".contactName").value,
    email: document.querySelector(".contactEmail").value,
    phone: document.querySelector(".contactPhone").value,
    age: document.querySelector(".contactAge").value,
    password: document.querySelector(".contactPass").value,
  };
  localStorage.setItem("userData", JSON.stringify(userData));
  alert("Data saved successfully!");
});

import {submitBtn , contactSec , contactUsBtn} from "./validation.js"

//======DARK MODE THEME======//

import {darkIcon , changeTheme , lightIcon} from "./theme.js"

darkIcon.addEventListener("click", changeTheme);
lightIcon.addEventListener("click", changeTheme);
