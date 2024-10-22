import { fetchCategories, fetchWorks } from "./api.js";

// vérification état connexion et modif page pour User connecté
const userConnected = localStorage.getItem('token');
console.log(userConnected)

function PageForUserAuth() {
  const btnLogin = document.getElementById("linkLogin");
  const btnManageWorks = document.getElementById("manageWorks");
  let divFilter = document.getElementById("filter");  
  btnLogin.innerHTML = "logout";
  btnManageWorks.innerHTML = '<i class="fa-xs fa-regular fa-pen-to-square fa-style" aria-hidden="true"></i>modifier';
  divFilter.remove();  
  document.getElementById("linkLogin").id="linkLogout";  
}

// écouteur sur btn logout et rechargement page index

document.addEventListener("DOMContentLoaded", function() {
  const btnLogout = document.getElementById("linkLogout"); 
   if (btnLogout !== null) {
    btnLogout.addEventListener("click" , function() {  
      localStorage.removeItem('token');     
      window.location = "/FrontEnd/index.html";
      }) 
  } else {
    console.log("l'utilisateur n'est pas connecté")
  } 
})



//modif DOM gallery
// projets
function renderWorks(works) {
  const sectionGallery = document.querySelector(".gallery");

  works.forEach((work) => {
    console.log(work)
    const box = document.createElement("figure");
    const image = document.createElement("img");
    image.src = work.imageUrl;
    image.alt = work.title;
    const legende = document.createElement("figcaption");
    legende.innerHTML = work.title;

    sectionGallery.appendChild(box);
    box.appendChild(image);
    box.appendChild(legende);
  });
}
// categories
function renderCategories(categories) {
  const sectionFilter = document.querySelector(".filter");
if(sectionFilter) {
  categories.forEach((categorie) => {
    
    const button = document.createElement("button");
    button.classList.add("btn-filter");
    button.innerHTML = categorie.name;    
    sectionFilter.appendChild(button);    
  });
}
}

// fonction initialisation

const init = async () => {
  if (userConnected) {
    PageForUserAuth();
  };


  const works = await fetchWorks();
  const categories = await fetchCategories();
  

  //Afficher les travaux
  renderWorks(works);
  renderCategories(categories)

  //variables pour filtre

  const btnFilter = document.querySelectorAll(".btn-filter");
  let btnActive = document.querySelector(".btn-active");
  let indexCurrent = 0;

  // écouteur sur btn filtre

  btnFilter.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      btnActive = document.querySelector(".btn-active");
      indexCurrent = [index];
      filterWorks();
      updateBtn();
    });
  });

  // Filtres et update classe

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
    btnActive.classList.remove("btn-active");
    btnFilter[indexCurrent].classList.add("btn-active");
  }
};


// appel initialisation
init();

const navLink = document.querySelectorAll("nav li"); // ajouter class pour modif weight sélection lien
