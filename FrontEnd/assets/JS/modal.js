import { fetchWorks, deleteWork, addWorkData } from "./api.js";
import { htmlElementMod1, htmlElementMod2 } from "./modalContent.js";

const modalContainer = document.querySelector(".modal-container");
let modalTriggers = document.querySelectorAll(".modal-trigger");

export class Modal {
  works = [];

  constructor(works) {
    this.works = works;
  }

  render() {
        document.getElementById("modal").innerHTML = htmlElementMod1(this.works);
        let modalTriggers = document.querySelectorAll(".modal-trigger");
        modalTriggers.forEach((trigger) =>
          trigger.addEventListener("click", toggleModal)
        );
        btnToModal2();
        SupprWork();
      }
}

export const ModalObj = (works, handleDeleteWork) => {
        function render() {
                document.getElementById("modal").innerHTML = renderGalleryModal(works, handleDeleteWork);
                let modalTriggers = document.querySelectorAll(".modal-trigger");
                modalTriggers.forEach((trigger) =>
                  trigger.addEventListener("click", toggleModal)
                );
                btnToModal2();
                SupprWork();
              }

              return {
                render
              }
}

// gestion de la classe active pour l'affichage de la modale

function toggleModal() {
  modalContainer.classList.toggle("active");
}

modalTriggers.forEach((trigger) =>
  trigger.addEventListener("click", toggleModal)
);

// écouteur sur bouton "ajouter" pour afficher la modale 2
function btnToModal2() {
  const btnAjout = document.getElementById("btnModal1");

  if (btnAjout) {
    btnAjout.addEventListener("click", function () {
      document.getElementById("modal").innerHTML = " ";
      document.getElementById("modal").innerHTML = htmlElementMod2;
      let modalTriggers = document.querySelectorAll(".modal-trigger");
      modalTriggers.forEach((trigger) =>
        trigger.addEventListener("click", toggleModal)
      );
      btnToModal1();
      imgModalPreview();
      btnModal2();
    });
  }
}

// écouteur sur bouton flèche gauche pour afficher la modale 1
function btnToModal1() {
  const btnArrow = document.getElementById("btnArrow");
  if (btnArrow) {
    btnArrow.addEventListener("click", function () {
      loadModal1();
    });
  }
}

// écouteur sur bouton valider de la modale 2 pour activer fonction addWork

function btnModal2() {
  const formModal = document.getElementById("addWorkForm");
  const btnValid = document.getElementById("btnModal2");
  if (formModal) {
    btnValid.addEventListener("click", function () {
      addWork();
    });
  }
}

// affichage initial du contenu de la modale 1
function loadModal1() {
  document.getElementById("modal").innerHTML = htmlElementMod1;
  let modalTriggers = document.querySelectorAll(".modal-trigger");
  modalTriggers.forEach((trigger) =>
    trigger.addEventListener("click", toggleModal)
  );
  btnToModal2();
  SupprWork();
}

//loadModal1();

// Modale 1 : supression de la div dans le DOM après la suppresion du projet en lien avec SupprWork
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
// Modale 1 : écouteur sur logo poubelle pour supprimer les projets par id
async function SupprWork(handleDeleteWork) {
  const btnsTrashCan = document.querySelectorAll(".trash");
  if (btnsTrashCan) {
    const works = await fetchWorks();

    btnsTrashCan.forEach((btnTrash, index) => {
      const workIndex = works[index];
      const workId = workIndex.id;
      btnTrash.addEventListener("click", function () {
        deleteParentDiv(workId);
        handleDeleteWork(workId);
      });
    });
  }
}

// Modale 2 : affichage de l'image en preview après son chargement
async function imgModalPreview() {
  const fileInputImg = document.getElementById("imgMod");
  const imageModalContainerPreview = document.getElementById(
    "imgPreviewContainer"
  );
  const imageModalPreview = document.getElementById("imagePreview");
  const boxUpload = document.getElementById("boxUpload");
  const i = boxUpload.querySelector("i");
  const label = boxUpload.querySelector("label");
  const p = boxUpload.querySelector("p");

  try {
    fileInputImg.addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          imageModalPreview.src = e.target.result;
          imageModalContainerPreview.style.display = "block";
          i.style.display = "none";
          label.style.display = "none";
          p.style.display = "none";
        };
        reader.readAsDataURL(file);
      } else {
        imageModalPreview.style.display = "none";
        imageModalContainerPreview.style.display = "none";
      }
    });
  } catch (error) {
    console.error("erreur lors de l'affichage ", error);
  }
}
// Modale 2 : suppression de l'image en preview après son transfert en Backend
async function resetImgModalPreview() {
  const imageModalContainerPreview = document.getElementById(
    "imgPreviewContainer"
  );
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

// Modale 2 : envoi des données du projet en Backend
async function addWork() {
  // Récupère les éléments du formulaire
  const fileInput = document.getElementById("imgMod");
  const image = fileInput.files[0];
  const title = document.getElementById("titleMod").value;
  const categoryId = document.getElementById("categorieMod").value;

  if (!image) {
    console.error("Aucun fichier sélectionné.");
    return;
  }

  // Créer un objet FormData données formulaire
  const formData = new FormData();
  formData.append("image", image);
  formData.append("title", title);
  formData.append("category", categoryId);

  // transmission api
  await addWorkData(formData);

  // clear formulaire
  const formReset = document.getElementById("addWorkForm");
  formReset.reset();
  fileInput.value = "";
  resetImgModalPreview();
}

/*async function checkFormFields() {
        const titleInput = document.getElementById("titleMod");
        const categoryInput = document.getElementById("categorieMod");
        const fileInput = document.getElementById("imgMod");
        const submitBtn = document.getElementById("btnModal2");
    if (titleInput.value.trim() !== "" && categoryInput.value !== "" && fileInput.files.length > 0) {
        submitBtn.disabled = false;  
    } else {
        submitBtn.disabled = true;  
    }
}*/
