import { getWorks, getCategories} from "./api.js";

const renderWorks = (works) => {
  // TODO transformer en forEach
  for (let i = 0; i < works.length - 1; i++) {
    const indexWorks = works[i];

    const sectionGallery = document.querySelector(".gallery");

    const box = document.createElement("figure");
    const image = document.createElement("img");
    image.src = indexWorks.imageUrl;
    const legende = document.createElement("figcaption");
    legende.innerHTML = indexWorks.title;

    sectionGallery.appendChild(box);
    box.appendChild(image);
    box.appendChild(legende);
  }
};
 // render catégories
const renderCategories = (categories) => {
   for (let i = 0; i < categories.length - 1; i++) {
    const indexCategory = categories[i]; 
}}

const init = async () => {
  const works = await getWorks();
  const categories = await getCategories();
 
 // afficher les travaux et catégories
  renderWorks(works);
  renderCategories(categories);  

    
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

  // Filtres
  
function filterWorks() {
  if (indexCurrent == 0) {
  document.querySelector(".gallery").innerHTML =" ";
  return renderWorks(works);  
  }
  else {
  const filterType = works.filter(work => work.category.id == [indexCurrent]);
  document.querySelector(".gallery").innerHTML =" ";
  renderWorks(filterType);
  }  
};

function updateBtn() {
  btnActive.classList.remove("btn-active");
  btnFilter[indexCurrent].classList.add("btn-active");
}
}

init();

