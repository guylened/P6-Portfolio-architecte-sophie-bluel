import { getWorks, getCategories} from "./api.js";

const renderWorks = (works) => {
  // TODO transformer en forEach
  for (let i = 0; i < works.length; i++) {
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
    categories.forEach(category => { 
      let i = 0; i < categories.length; i++; 
      const dataCategories = categories[i];        
    });
    console.log({categories})
}

const init = async () => {
  const works = await getWorks();
  const categories = await getCategories();
  

  // TODO iniitialiser une variable defaultWorks (trouver un autre nom)


 // afficher les travaux et catégories
  renderWorks(works);
  renderCategories(categories);

  // TODO créer une fonction events , dans le quel tu auras tout les addEventListener -> 
  const btnFilter = document.querySelectorAll(".btn-filter");
  btnFilter.addEventListener("click", {
    const filterObjets = works.filter(function (work) {
      return work.category.id = "1"
    })
    const filterAppart = works.filter(function (work) {
      return work.category.id = "2"
    })
    console.log({filterObjets})
    console.log({filterAppart})
  });
    // TODO Filter par catégorie 
  //  addEventListener 
  // filtrer ton tableau de works par rapport au data-id work.category.id ==== dataId
  // renderWorks(newWorks)

};

init();

