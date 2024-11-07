import { addWork } from "./api.js";
import { works, renderWorks } from "./index.js";

let updateWorksWhenAdd = (work) => {
  const updateAdddWorks = [...works, work];
  works.length = 0;
  works.push(...updateAdddWorks);
};

//récupération éléments DOM
const getFormElements = () => ({
  fileInputImg: document.getElementById("imgMod"),
  previewContainer: document.getElementById("imgPreviewContainer"),
  imagePreview: document.getElementById("imagePreview"),
  boxUpload: document.getElementById("boxUpload"),
  btnSubmit: document.getElementById("btnModal2"),
  workTitle: document.getElementById("titleMod"),
  workCategory: document.getElementById("categorieMod"),
  msgAddForm: document.getElementById("msgAddForm"),
});

// Gestion affichage preview modale vue 2
export async function imgModalPreview() {
  const { fileInputImg, imagePreview, previewContainer, boxUpload } =
    getFormElements();
  const [icon, label, text] = boxUpload.querySelectorAll("i, label, p");

  fileInputImg.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.src = e.target.result;
        previewContainer.style.display = "block";
        icon.style.display = "none";
        label.style.display = "none";
        text.style.display = "none";
      };
      reader.readAsDataURL(file);
    } else {
      previewContainer.style.display = "none";
    }
  });
}

function resetImgModalPreview() {
  const { imagePreview, previewContainer, boxUpload } = getFormElements();
  const [icon, label, text] = boxUpload.querySelectorAll("i, label, p");
  imagePreview.src = "";
  previewContainer.style.display = "none";
  icon.style.display = "block";
  label.style.display = "block";
  text.style.display = "block";
}

// Gestion vérification et validation formulaire modale vue 2
export function disabledSubmit() {
  document.getElementById("btnModal2").disabled = true;
}

function clearForm() {
  const { fileInputImg, btnSubmit } = getFormElements();
  document.getElementById("addWorkForm").reset();
  fileInputImg.value = "";
  resetImgModalPreview();
  disabledSubmit();
  btnSubmit.classList.remove("active");
}
export function checkForm() {
  document.getElementById("addWorkForm").addEventListener("input", () => {
    const { fileInputImg, btnSubmit, workTitle, workCategory } =
      getFormElements();
    const image = fileInputImg.files[0];
    const title = workTitle.value;
    const category = workCategory.value;

    if (image !== "" && title !== "" && category !== "") {
      btnSubmit.disabled = false;
      btnSubmit.classList.add("active");
    } else {
      btnSubmit.disabled = true;
      btnSubmit.classList.remove("active");
    }
  });
}

// gestion ajout d'un projet
async function validAddWork() {
  const { fileInputImg, btnSubmit, workTitle, workCategory, msgAddForm } =
    getFormElements();
  const image = fileInputImg.files[0];
  const title = workTitle.value;
  const category = workCategory.value;

  if (image === "" && title === "" && category === "") {
    msgAddForm.innerText = "Veuillez compléter les champs";
    disabledSubmit();
    btnSubmit.classList.remove("active");
    return;
  }

  // Créer un objet FormData avec données formulaire
  const formData = new FormData();
  formData.append("image", image);
  formData.append("title", title);
  formData.append("category", category);

  // transmission api
  try {
    const result = await addWork(formData);

    clearForm();

    updateWorksWhenAdd(result);

    renderWorks(works);
  } catch (error) {
    console.error("Erreur lors de l'ajout du projet :", error);
  }
}

// inistialisation validation formulaire
export function initValidAddWork() {
  document.getElementById("btnModal2").addEventListener("click", validAddWork);
}
