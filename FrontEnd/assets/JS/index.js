import { getCategories, getWorks, addWork, deleteWork } from "./api.js";

let works = []
let categories  = []

// CONTENU FIXE DES MODALES
const htmlContentMod1 = { titre: 'Galerie photo', btn: 'Ajouter une photo' };
const htmlContentMod2 = {
  titre: 'Ajout photo',
  labelPhoto: '+ Ajouter photo',
  infoPhoto: 'jpg, png : 4Mo max',
  labelT: 'Titre',
  labelC: 'Catégorie',
  option: '--Choisissez dans la liste--',
  btn: 'Valider',
};

// MODALES ET AFFICHAGE DES DONNÉES
const renderWorksModal = (works) => works
  .map((work) => `<div id="${work.id}" class="imgBoxMod">
      <img src="${work.imageUrl}" alt='${work.title}'>
      <i class="fa-xs fa-solid fa-trash-can trash"></i>
      </div>`)
  .join('');

const renderCategoriesModal = (categories) => categories
  .map((category) => `<option value="${category.id}">${category.name}</option>`)
  .join('');

const htmlElementMod1 = (works) => `
  <i class="fa-lg fa-solid fa-xmark close-modal modal-trigger"></i>
  <h3>${htmlContentMod1.titre}</h3>
  <div class="gridImgModal">${renderWorksModal(works)}</div>
  <p id="msgDel"></p> 
  <button id="btnModal1" class="btnModal">${htmlContentMod1.btn}</button>
`;

const htmlElementMod2 = (categories) => `
  <i id="btnArrow" class="fa-lg fa-solid fa-arrow-left navLeftMod"></i>
  <i class="fa-lg fa-solid fa-xmark close-modal modal-trigger"></i>
  <h3>${htmlContentMod2.titre}</h3>
  <form id="addWorkForm" class="formModal">
    <div id="boxUpload" class="boxUpload">
      <i class="fa-5x fa-regular fa-image imgUpload"></i>
      <label for="imgMod" class="labelUpload">${htmlContentMod2.labelPhoto}</label>
      <input type="file" name="imgMod" id="imgMod" accept="image/png, image/jpg"/>
      <p>${htmlContentMod2.infoPhoto}</p>
      <div id="imgPreviewContainer"><img id="imagePreview" src="" alt="Aperçu de l'image"/></div>
    </div>
    <label for="titleMod">${htmlContentMod2.labelT}</label>
    <input type="text" name="titleMod" id="titleMod">
    <label for="categorieMod">${htmlContentMod2.labelC}</label>
    <select name="categorieMod" id="categorieMod">
      <option value="">${htmlContentMod2.option}</option>
      ${renderCategoriesModal(categories)}
    </select>
  </form>
  <p id="msgAddForm"></p>  
  <button id="btnModal2" class="btnModal2">${htmlContentMod2.btn}</button>
`;

// GESTION DES MODALES ET ACTIONS UTILISATEUR
function toggleModal() {
  document.querySelector(".modal-container").classList.toggle("active");
}

function initModalTriggers() {
  document.querySelectorAll(".modal-trigger").forEach(trigger => trigger.addEventListener("click", toggleModal));
}

function loadModalContent(contentHTML) {
  const modal = document.getElementById("modal");
  modal.innerHTML = contentHTML;
  initModalTriggers();
}

function displayDeleteWorksModal() {
  loadModalContent(htmlElementMod1(works));
  document.getElementById("btnModal1").addEventListener("click", displayAddWorkModal);
  initDeleteWork();  
}

function displayAddWorkModal() {
  loadModalContent(htmlElementMod2(categories));  
  document.getElementById("btnArrow").addEventListener("click", displayDeleteWorksModal);
  disabledSubmit();
  imgModalPreview();
  checkForm();
  initValidAddWork();
}

// SUPPRESSION ET AJOUT DE PROJET
async function deleteParentDiv(workId) {
  try {
    const workDiv = document.getElementById(`${workId}`);

    if (workDiv) {
      workDiv.remove();
    } else {
      console.error("element non trouvé.");
    }
  } catch (error) {
    console.error("erreur lors de la supression: ", error);
  }
}
function updateDelGallery(workId) {
  const galleryItem = document.querySelector(`#work-${workId}`);
  if (galleryItem) {
    galleryItem.remove();
  }
}

async function initDeleteWork() {
  document.querySelectorAll(".trash").forEach((btnTrash, index) => {
    btnTrash.addEventListener("click", async () => {
      const workId = works[index].id;
      await deleteWork(workId);
      deleteParentDiv(workId);
      updateDelGallery(workId)
    });
  });
}

async function imgModalPreview() {
  const fileInputImg = document.getElementById("imgMod");
  const previewContainer = document.getElementById("imgPreviewContainer");
  const imagePreview = document.getElementById("imagePreview");
  const boxUpload = document.getElementById("boxUpload");
  const i = boxUpload.querySelector("i");
  const label = boxUpload.querySelector("label");
  const p = boxUpload.querySelector("p");

  fileInputImg.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.src = e.target.result;
        previewContainer.style.display = "block";
        i.style.display = "none";
        label.style.display = "none";
        p.style.display = "none";
      };
      reader.readAsDataURL(file);
    } else {
      previewContainer.style.display = "none";      
    }
  });
}

function resetImgModalPreview() {
  const imageModalContainerPreview = document.getElementById("imgPreviewContainer");
  const imageModalPreview = document.getElementById("imagePreview");
  const boxUpload = document.getElementById("boxUpload");
  const i = boxUpload.querySelector("i");
  const label = boxUpload.querySelector("label");
  const p = boxUpload.querySelector("p");

  imageModalPreview.src = "";
  imageModalContainerPreview.style.display = "none";
  i.style.display = "block";
  label.style.display = "block";
  p.style.display = "block";
}
function disabledSubmit() {
  document.getElementById("btnModal2").disabled = true;
}

function checkForm() {
  document.getElementById("addWorkForm").addEventListener("input", () => {
    const fileInput = document.getElementById("imgMod");
    const image = fileInput.files[0];
    const title = document.getElementById("titleMod").value;
    const categoryId = document.getElementById("categorieMod").value;
    const submitButton = document.getElementById("btnModal2")    
  if(image !== '' && title !== '' && categoryId !== '')
  {
      submitButton.disabled = false;
      submitButton.classList.add("active");
      document.getElementById("msgAddForm").innerText = "";

  } else {
      submitButton.disabled = true;
      submitButton.classList.remove("active");
  }
  })
}

async function validAddWork() {
 // Récupère les éléments du formulaire
 const fileInput = document.getElementById("imgMod");
 const image = fileInput.files[0]; 
 const title = document.getElementById("titleMod").value;
 const categoryId = document.getElementById("categorieMod").value; 

 if (image == '' && title == '' && categoryId == '') {
  document.getElementById("msgAddForm").innerText = "Veuillez compléter les champs"; 
   return;
 }


 // Créer un objet FormData avec données formulaire
 const formData = new FormData();
 formData.append("image", image);
 formData.append("title", title);
 formData.append("category", categoryId);

 // transmission api
 try {

 
 await addWork(formData);
 console.log("transmission api ok");
 document.getElementById("msgAddForm").classList.add("valid")
 document.getElementById("msgAddForm").innerText = "Le projet a été ajouté avec succès";

 // clear formulaire
 document.getElementById("addWorkForm").reset();
 fileInput.value = "";
 resetImgModalPreview();
 renderWorks(works);
 renderCategories(categories);

} catch (error) {console.error("Erreur lors de l'ajout du projet :", error);}
}

function initValidAddWork() {
  document.getElementById("btnModal2").addEventListener("click", validAddWork);
}

// RENDU DES TRAVAUX ET FILTRES
function renderWorks(works) {
  const gallerySection = document.querySelector(".gallery");
  gallerySection.innerHTML = '';
  works.forEach(work => {
    const box = document.createElement("figure");
    box.id = `work-${work.id}`;
    box.innerHTML = `<img src="${work.imageUrl}" alt="${work.title}"><figcaption>${work.title}</figcaption>`;
    gallerySection.appendChild(box);
  });
}

function renderCategories(categories) {
  const filterSection = document.querySelector(".filter");
  if (filterSection) {
    categories.forEach(categorie => {
      const button = document.createElement("button");
      button.classList.add("btn-filter");
      button.innerHTML = categorie.name;
      filterSection.appendChild(button);
    });
    initFilterButtons();
  }
}


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
  document.querySelector(".btn-active").classList.remove("btn-active");
  document.querySelectorAll(".btn-filter")[indexCurrent].classList.add("btn-active");
}

function updateUserInterfaceForAuth() {
  document.getElementById("linkLogin").textContent = "logout";
  document.getElementById("manageWorks").innerHTML = '<i class="fa-xs fa-regular fa-pen-to-square fa-style" aria-hidden="true"></i>modifier';
  document.getElementById("filter")?.remove();
  document.getElementById("linkLogin").id = "linkLogout";
  document.getElementById("linkLogout").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location = "/FrontEnd/index.html";
  });
}


// INITIALISATION
async function init() {
  if (localStorage.getItem("token")) {updateUserInterfaceForAuth();} 

  works = await getWorks();
  categories = await getCategories();
  renderWorks(works);
  renderCategories(categories);
  displayDeleteWorksModal();

}



  

// APPEL DE L'INITIALISATION
document.addEventListener("DOMContentLoaded", init);






