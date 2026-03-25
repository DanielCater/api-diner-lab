/* 
let menuItem = {
  name: "Classic Cheeseburger",
  price: 9.99,
  category: "Burgers",
  toppings: ["lettuce", "tomato", "onion", "pickles"],
  nutrition: {
    calories: 540,
    protein: 28
  }
};

let myDinerOrder = {
  name: "BLT",
  price: 7.99,
  category: "Sandwich",
  toppings: ["lettuce", "tomato", "bacon", "mayo"],
  nutrition: {
    calories: 500,
    protein: 15
  }
};

console.log(menuItem);
console.log(menuItem.name);
console.log(menuItem["price"]);
console.log(menuItem.toppings[2]);
console.log(menuItem.nutrition.calories);

// Convert the JS object to a JSON string
let jsonString = JSON.stringify(menuItem);
console.log("JSON string:", jsonString);
console.log("Type:", typeof jsonString);

// Convert the JSON string back to a JS object
let parsedObj = JSON.parse(jsonString);
console.log("Parsed object:", parsedObj);
console.log("Type:", typeof parsedObj);
console.log("Name:", parsedObj.name);
*/
"use strict";

function init() {
  let btn = document.getElementById("fetch-btn");
  btn.addEventListener("click", fetchDog);

  let btn2 = document.getElementById("meal-btn");
  btn2.addEventListener("click", fetchMeal);

  let btn3 = document.getElementById("fetch-joke-setup");
  btn3.addEventListener("click", fetchJokeSetup);

  let btn4 = document.getElementById("number-btn");
  btn4.addEventListener("click", fetchNumberFact);
}

function fetchDog() {
  let url = "https://dog.ceo/api/breeds/image/random";
  fetch(url)
    .then(statusCheck)
    .then(resp => resp.json())
    .then(showDog)
    .catch(handleError);
}

function showDog(data) {
  console.log("Dog data:", data);
  let img = document.createElement("img");
  img.src = data.message;
  img.alt = "A random dog";
  document.getElementById("output").appendChild(img);
}

async function statusCheck(res) {
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res;
}

function handleError(err) {
  console.error("Something went wrong:", err);
  document.getElementById("output").textContent =
    "The kitchen is closed! (Error loading data)";
}

init();

function fetchMeal() {
  let food = document.getElementById("food-input").value;
  let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + food;
  fetch(url)
    .then(statusCheck)
    .then(resp => resp.json())
    .then(showMeals)
    .catch(handleError2);
}

function showMeals(data) {
  let div = document.getElementById("meal-output");
  div.textContent = "";
  console.log("Meal data: ", data);
  for(let meal of data.meals){
    let name = document.createElement("p");
    name.textContent = meal.strMeal;
    let category = document.createElement("p");
    category.textContent = meal.strCategory;
    let img = document.createElement("img");
    img.src = meal.strMealThumb;
    img.alt = "A meal";
    document.getElementById("meal-output").appendChild(name);
    document.getElementById("meal-output").appendChild(category);
    document.getElementById("meal-output").appendChild(img);
  }
}

function handleError2(err) {
  console.error("Something went wrong:", err);
  document.getElementById("meal-output").textContent =
    "Sorry, that's not on our menu.";
}



function fetchJokeSetup(){
  let url = "https://official-joke-api.appspot.com/random_joke";
  fetch(url)
    .then(statusCheck)
    .then(resp => resp.json())
    .then(tellJokeSetup)
    .catch(handleError);

}
function tellJokeSetup(data) {
  console.log("Joke data:", data);
  let setup = document.createElement("p");
  setup.textContent = data.setup;
  let punchline = document.createElement("p");
  punchline.textContent = data.punchline;

   document.getElementById("joke-output").appendChild(setup);
  setTimeout(() =>{
    document.getElementById("joke-output").appendChild(punchline);
  },3000);

}

function fetchNumberFact() {
  let number = document.getElementById("number-input").value;
  let url = "https://numbersapi.com/" + number;

  fetch(url)
    .then(statusCheck)
    .then(resp => resp.text())
    .then(showNumberFact)
    .catch(handleNumberError);
}

function showNumberFact(data) {
  console.log("Number fact:", data);
  document.getElementById("number-output").textContent = data;
}

function handleNumberError(err) {
  console.error("Something went wrong:", err);
  document.getElementById("number-output").textContent =
    "Could not load a number fact.";
}





