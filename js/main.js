//^ home main elements
const cardSec = document.querySelector(".details");
const homeSec = document.querySelector(".rowData");
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

async function getMealDetails(id) { // Fetch full details of a meal by ID and show details section
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
          
          <button class="btn btn-warning me-2 mt-2" onclick="window.open('${
            meal.strSource
          }', '_blank')">Source</button>
          <button class="btn btn-danger me-2 mt-2" onclick="window.open('${
            meal.strYoutube
          }', '_blank')">Youtube</button>
         
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
const searchBtn = document.querySelector(".search");
const searchSec = document.querySelector(".searchSec");
const nameInput = document.querySelector(".searchByN");
const letterInput = document.querySelector(".searchByL");

searchBtn.addEventListener("click", function () {
  hideAllSections();
  searchSec.classList.remove("d-none");
});

nameInput.addEventListener("input", searchName);

function searchName() {
  // Function: Get search input by name and call API
  const mealN = nameInput.value.trim();
  getName(mealN);
}

async function getName(value) {
  // Function: Fetch meals by name and display search results
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

letterInput.addEventListener("change", searchLetter);

function searchLetter() {
  // Function: Get search input by first letter and call API
  const mealFirstL = letterInput.value.trim();
  getLetter(mealFirstL);
}
async function getLetter(value) {
  // Function: Fetch meals by first letter and display results
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

//===========category api section=========//
const categoresBtn = document.querySelector(".categores");
const categorySec = document.querySelector(".categorySec");
const cateDetails = document.querySelector(".rowCateDetails");
const rowCate = document.querySelector(".rowCate");

categoresBtn.addEventListener("click", function () {
  hideAllSections();
  categorySec.classList.remove("d-none");
});

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
}
getCategoryApi(); // Function: Fetch all categories from API

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
//===========Area api section=========//
const areaBtn = document.querySelector(".area");
const areaSec = document.querySelector(".areaSec");
const rowArea = document.querySelector(".rowArea");
const rowAreaDetails = document.querySelector(".rowAreaDetails");

areaBtn.addEventListener("click", function () {
  hideAllSections();
  areaSec.classList.remove("d-none");
});

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
}
getAreaApi();

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
//===========ingredients api section=========//
const ingredientsBtn = document.querySelector(".ingredients");
const ingredientsSec = document.querySelector(".ingredientsSec");
const rowIngreSec = document.querySelector(".rowIngreSec");
const rowIngDetails = document.querySelector(".rowIngDetails");

ingredientsBtn.addEventListener("click", function () {
  hideAllSections();
  ingredientsSec.classList.remove("d-none");
});

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
}
getIngredients();

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
//===========validation section=========//
const contactUsBtn = document.querySelector(".contactUs");
const contactSec = document.querySelector(".contactSec");
const submitBtn = document.querySelector(".submitBtn");

contactUsBtn.addEventListener("click", function () {
  hideAllSections();
  contactSec.classList.remove("d-none");
});

const allInputs = document.querySelectorAll(".rowForm input");

allInputs.forEach((input) => {
  input.addEventListener("input", function () {
    let pattern = new RegExp(input.dataset.regex);
    if (pattern.test(input.value)) {
      input.classList.add("is-valid");
      input.classList.remove("is-invalid");
      checkValidation();
    } else {
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
    }
  });
});

function checkValidation() {
  // Function: Check all inputs validity and enable submit button if valid
  let allvalid = true;
  allInputs.forEach((input) => {
    let regex = new RegExp(input.dataset.regex);
    if (!regex.test(input.value)) {
      allvalid = false;
    }
  });
  if (allvalid) {
    submitBtn.classList.remove("disabled");
  }
}
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

//======DARK MODE THEME======//
const darkIcon = document.querySelector(".darkIcon");
const lightIcon = document.querySelector(".lightIcon");

let storedTheme = JSON.parse(localStorage.getItem("mode")) || false;
let darkTheme = storedTheme;

if (darkTheme) {
  document.body.classList.add("dark-theme");
  darkIcon.classList.add("d-none");
  lightIcon.classList.remove("d-none");
} else {
  document.body.classList.remove("dark-theme");
  darkIcon.classList.remove("d-none");
  lightIcon.classList.add("d-none");
}

function changeTheme() {
  darkTheme = !darkTheme;
  localStorage.setItem("mode", JSON.stringify(darkTheme));

  if (darkTheme) {
    document.body.classList.add("dark-theme");
    darkIcon.classList.add("d-none");
    lightIcon.classList.remove("d-none");
  } else {
    document.body.classList.remove("dark-theme");
    darkIcon.classList.remove("d-none");
    lightIcon.classList.add("d-none");
  }
}

darkIcon.addEventListener("click", changeTheme);
lightIcon.addEventListener("click", changeTheme);
