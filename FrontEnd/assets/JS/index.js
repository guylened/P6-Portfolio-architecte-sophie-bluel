import { getWorks } from "./api.js";

// vérification connexion et modif page
const userConnected = localStorage.getItem('token');

function updatePageWhenUserAuthenticated() {
  // Suppression du bouton login
  // Ajout du bouton logout
  // Ajout des modifications pour la gallery
}

//modif DOM gallery
function renderWorks(works) {
  const sectionGallery = document.querySelector(".gallery");

  works.forEach((work) => {
    const box = document.createElement("figure");
    const image = document.createElement("img");
    image.src = work.imageUrl;
    const legende = document.createElement("figcaption");
    legende.innerHTML = work.title;

    sectionGallery.appendChild(box);
    box.appendChild(image);
    box.appendChild(legende);
  });
}



// fonction initialisation

const init = async () => {
  if (userConnected) {
    updatePageWhenUserAuthenticated();
  }

  const works = await getWorks();

  //Afficher les travaux
  renderWorks(works);

  //variables pour filtre

  const btnFilter = document.querySelectorAll(".btn-filter");
  let btnActive = document.querySelector(".btn-active");
  let indexCurrent = 0;

  // addEventListener

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
