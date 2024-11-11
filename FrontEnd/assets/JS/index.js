import { getCategories, getWorks } from "./api.js";
import { displayDeleteWorkModal } from "./modal.js";
import {checkContactForm } from "./utils.js";

// Initialisation Tableaux WORKS et CATEGORIES

export let works = [];
export let categories = [];

// rendu des projets portfolio
export function renderWorks(works) {
  const gallerySection = document.querySelector(".gallery");
  gallerySection.innerHTML = "";
  works.forEach((work) => {
    const box = document.createElement("figure");
    box.id = `work-${work.id}`;
    box.innerHTML = `<img src="${work.imageUrl}" alt="${work.title}"><figcaption>${work.title}</figcaption>`;
    gallerySection.appendChild(box);
  });
}

function renderCategories(categories) {
  const filterSection = document.querySelector(".filter");
  if (filterSection) {
    categories.forEach((categorie) => {
      const button = document.createElement("button");
      button.classList.add("btn-filter");
      button.innerHTML = categorie.name;
      filterSection.appendChild(button);
    });
    initFilterButtons();
  }
}

// Filtres et update btn
let indexCurrent = 0;

function initFilterButtons() {
  document.querySelectorAll(".btn-filter").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      indexCurrent = [index];
      filterWorks();
      updateBtn();
    });
  });
}

function filterWorks() {
  if (indexCurrent == 0) {
    document.querySelector(".gallery").innerHTML = " ";
    renderWorks(works);
  } else {
    const worksFiltered = works.filter(
      (work) => work.category.id == [indexCurrent]
    );
    document.querySelector(".gallery").innerHTML = " ";
    renderWorks(worksFiltered);
  }
}

function updateBtn() {
  document.querySelector(".btn-active").classList.remove("btn-active");
  document
    .querySelectorAll(".btn-filter")
    [indexCurrent].classList.add("btn-active");
}

// mise à jour page après authentification
function updateUserInterfaceForAuth() {
  document.getElementById("linkLogin").textContent = "logout";
  document.getElementById("manageWorks").innerHTML =
    '<i class="fa-xs fa-regular fa-pen-to-square fa-style" aria-hidden="true"></i>modifier';
  document.getElementById("filter")?.remove();
  document.getElementById("linkLogin").id = "linkLogout";
  document.getElementById("linkLogout").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location = "/FrontEnd/index.html";
  });
}

// INITIALISATION
async function init() {
  if (localStorage.getItem("token")) {
    updateUserInterfaceForAuth();
  }

  works = await getWorks();
  categories = await getCategories();

  renderWorks(works);
  renderCategories(categories);

  // initialisation 1ere vue modale
  displayDeleteWorkModal();
  
  checkContactForm ();
}

// APPEL DE L'INITIALISATION
document.addEventListener("DOMContentLoaded", init);
