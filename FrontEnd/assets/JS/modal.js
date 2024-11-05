import { deleteWork } from "./api.js";
import { works, categories } from "./index.js";
import { disabledSubmit, imgModalPreview, checkForm, initValidAddWork } from "./form.js"


 
let updateWorksWhenDelete = (workId) => {
  const updatedDelWorks = works.filter((work) => work.id !== workId);
    works.length = 0;
    works.push(...updatedDelWorks);     
  };

// Contenu fixe des modales
const htmlContentMod1 = { titre: "Galerie photo", btn: "Ajouter une photo" };
const htmlContentMod2 = {
  titre: "Ajout photo",
  labelPhoto: "+ Ajouter photo",
  infoPhoto: "jpg, png : 4Mo max",
  labelT: "Titre",
  labelC: "Catégorie",
  option: "--Choisissez dans la liste--",
  btn: "Valider",
};

// Contenu adaptable des modales
const renderWorksModal = (works) =>
  works
    .map(
      (work) => `<div id="${work.id}" class="imgBoxMod">
      <img src="${work.imageUrl}" alt='${work.title}'>
      <i class="fa-xs fa-solid fa-trash-can trash"></i>
      </div>`
    )
    .join("");

const renderCategoriesModal = (categories) =>
  categories
    .map(
      (category) => `<option value="${category.id}">${category.name}</option>`
    )
    .join("");

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
      <label for="imgMod" class="labelUpload">${
        htmlContentMod2.labelPhoto
      }</label>
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

// gestion affichage modales  
function toggleModal() {
  document.querySelector(".modal-container").classList.toggle("active");
  displayDeleteWorkModal();
}

function initModalTriggers() {
  document
    .querySelectorAll(".modal-trigger")
    .forEach((trigger) => trigger.addEventListener("click", toggleModal));
}

function loadModalContent(contentHTML) {
  const modal = document.getElementById("modal");
  modal.innerHTML = contentHTML;
  initModalTriggers();  
}

// affichage modale vue 1
export function displayDeleteWorkModal() {
  loadModalContent(htmlElementMod1(works));
  document
    .getElementById("btnModal1")
    .addEventListener("click", displayAddWorkModal);
    handleDeleteWork();
}
// affichage modale vue 2
function displayAddWorkModal() {
  loadModalContent(htmlElementMod2(categories));
  document
    .getElementById("btnArrow")
    .addEventListener("click", displayDeleteWorkModal);
  disabledSubmit();
  imgModalPreview();
  checkForm();
  initValidAddWork();
}

// Gestion suppression projet modale vue 1 
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
// mise à jour galerie
function removeWorkInGallery(workId) {
  const galleryItem = document.querySelector(`#work-${workId}`);
  if (galleryItem) {
    galleryItem.remove();
  }
}

// Gestion supression Work
async function handleDeleteWork() {
  document.querySelectorAll(".trash").forEach((btnTrash, index) => {
    btnTrash.addEventListener("click", async () => {
      const workId = works[index].id;
      await deleteWork(workId);

      updateWorksWhenDelete(workId);

      deleteParentDiv(workId);
      removeWorkInGallery(workId);
           
    });
  });
}
