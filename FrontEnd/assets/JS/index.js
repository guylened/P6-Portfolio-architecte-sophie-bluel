import { getWorks, getCategories} from "./api.js";




function changeHTML(item, i, array) {
  // TODO transformer en forEach
   
    let indexWorks = array[i];
    
    const sectionGallery = document.querySelector(".gallery");

    const box = document.createElement("figure");
    const image = document.createElement("img");
    image.src = indexWorks.imageUrl;
    const legende = document.createElement("figcaption");
    legende.innerHTML = indexWorks.title;

    sectionGallery.appendChild(box);
    box.appendChild(image);
    box.appendChild(legende);
  
};



const init = async () => {
  const works = await getWorks();
  const categories = await getCategories();

  //Afficher les travaux
  const DefaultWorks = works.forEach(changeHTML)
 
 

    
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
  works.forEach(changeHTML);  
  }
  else {
  const filterType = works.filter(work => work.category.id == [indexCurrent]);
  document.querySelector(".gallery").innerHTML =" ";
  filterType.forEach(changeHTML);
  }  
};

function updateBtn() {
  btnActive.classList.remove("btn-active");
  btnFilter[indexCurrent].classList.add("btn-active");
}
}

init();

