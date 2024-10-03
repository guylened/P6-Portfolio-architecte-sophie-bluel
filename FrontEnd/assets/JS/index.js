import { getWorks, getCategories} from "./api.js";

const btnFilter = document.querySelectorAll(".btn-filter");


const renderWorks = (works) => {
  // TODO transformer en forEach
  for (let i = 0; i < works.length - 1; i++) {
    const dataWorks = works[i];

    const sectionGallery = document.querySelector(".gallery");

    const box = document.createElement("figure");
    const image = document.createElement("img");
    image.src = dataWorks.imageUrl;
    const legende = document.createElement("figcaption");
    legende.innerHTML = dataWorks.title;

    sectionGallery.appendChild(box);
    box.appendChild(image);
    box.appendChild(legende);
  }
};
 // TODO render les catégories
const renderCategories = (categories) => {
   for (let i = 0; i < categories.length - 1; i++) {
    const dataCategory = categories[i]; 
}}

const init = async () => {
  const works = await getWorks();
  const categories = await getCategories();
 
 // afficher les travaux et catégories
  renderWorks(works);
  renderCategories(categories);

  // TODO iniitialiser une variable defaultWorks (trouver un autre nom)
  
  // TODO créer une fonction events , dans le quel tu auras tout les addEventListener -> 
  let btnActive = document.querySelector(".btn-active");
  let indexCurrent = 0;

  btnFilter.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      btnActive = document.querySelector(".btn-active");
      indexCurrent = [index];
      filterWorks();
      updateBtn();
    });
  });

function filterWorks() {
  const filterType = works.filter( work => work.category.id == [indexCurrent]);
  document.querySelector(".gallery").innerHTML =" ";
  renderWorks(filterType);
  

};
function updateBtn() {
  btnActive.classList.remove("btn-active");
  btnFilter[indexCurrent].classList.add("btn-active");
}
   
// TODO Filter par catégorie 
//  addEventListener 
 // filtrer ton tableau de works par rapport au data-id work.category.id ==== dataId
// renderWorks(newWorks)

}

init();

