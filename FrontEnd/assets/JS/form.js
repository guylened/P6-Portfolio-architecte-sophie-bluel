import { addWork, deleteMsgModal } from "./api.js";
import { works, renderWorks } from "./index.js";

const updateWorksWhenAdd = (work) => {
    works = [...works, work];
  };

// Gestion affichage preview modale vue 2
export async function imgModalPreview() {
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
  // Gestion vérification et validation formulaire modale vue 2
  export function disabledSubmit() {
    document.getElementById("btnModal2").disabled = true;
  }

function clearForm () {
    document.getElementById("addWorkForm").reset();
    document.getElementById("imgMod").value = "";
      resetImgModalPreview();
      disabledSubmit();      
      document.getElementById("btnModal2").classList.remove("active");

}  
  export function checkForm() {
    document.getElementById("addWorkForm").addEventListener("input", () => {
      const fileInput = document.getElementById("imgMod");
      const image = fileInput.files[0];
      const title = document.getElementById("titleMod").value;
      const categoryId = document.getElementById("categorieMod").value;
      const submitButton = document.getElementById("btnModal2");
      if (image !== "" && title !== "" && categoryId !== "") {
        submitButton.disabled = false;
        submitButton.classList.add("active");        
      } else {
        submitButton.disabled = true;
        submitButton.classList.remove("active");
      }
    });
  }
   // gestion ajout d'un projet
  async function validAddWork() {  
    const fileInput = document.getElementById("imgMod");
    const image = fileInput.files[0];
    const title = document.getElementById("titleMod").value;
    const categoryId = document.getElementById("categorieMod").value;
  
    if (image === "" && title === "" && categoryId === "") {
      document.getElementById("msgAddForm").innerText = "Veuillez compléter les champs";
      disabledSubmit();
      document.getElementById("btnModal2").classList.remove("active");
      return;
    }
  
    // Créer un objet FormData avec données formulaire
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("category", categoryId);
  
    // transmission api
    try {
      const result = await addWork(formData);      
        
      // clear formulaire
      setTimeout(deleteMsgModal, 2000 );
      clearForm ();
  
      // Mise à jour du tableau de works
      updateWorksWhenAdd(result);
  
      renderWorks(works);    
    } catch (error) {
      console.error("Erreur lors de l'ajout du projet :", error);
    }
  }
  
  export function initValidAddWork() {
    document.getElementById("btnModal2").addEventListener("click", validAddWork);
  }
  