import { fetchWorks, fetchCategories, deleteWork, addWorkData } from "./api.js";
import { htmlElementMod1, htmlElementMod2 } from "./modalContent.js";


// ajout/suppression de la class active pour gérer l'affichage de la modale

const modalContainer = document.querySelector(".modal-container");
let modalTriggers = document.querySelectorAll(".modal-trigger");

function toggleModal(){modalContainer.classList.toggle("active")}

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))



// addeventListener sur bouton ajouter pour afficher la modal 2
function btnToModal2() {
        const btnAjout = document.getElementById("btnModal1")  
             
        if (btnAjout) {        
                btnAjout.addEventListener("click", function() {
                        document.getElementById("modal").innerHTML = " ";                        
                        document.getElementById("modal").innerHTML = htmlElementMod2;
                        let modalTriggers = document.querySelectorAll(".modal-trigger");
                        modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal));
                        btnToModal1();
                        imgModalPreview();
                        btnModal2();
                }) 
        }         
};
        

// addeventListener sur bouton flèche gauche pour afficher la modale 1
function btnToModal1() {
        const btnArrow = document.getElementById("btnArrow")                     
        if (btnArrow) {        
                btnArrow.addEventListener("click", function() {
                        loadModal1();                        
                });
                
        }
}

function btnModal2() {
        const formModal = document.getElementById("addWorkForm")
        const btnValid = document.getElementById("btnModal2")
        console.log(formModal)
        if (formModal){
                btnValid.addEventListener("click", function () {                        
                        addWork();
                })
        }
}

// affichage initial du contenu de la modale 1
 function loadModal1() {       
        document.getElementById("modal").innerHTML = htmlElementMod1;
        let modalTriggers = document.querySelectorAll(".modal-trigger");
        modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal));            
        btnToModal2();
        SupprWork();     
        
};

loadModal1();


// addeventListener sur poubelle pour supprimer image par id
async function deleteParentDiv(workId) {    
        try{  
                const workDiv = document.getElementById(`${workId}`)
                                
                if(workDiv) {
                        workDiv.remove();
                } else {
                        console.error("element non trouvé.");
                }
                
        } catch (error) {
                console.error("erreur lors de la supression: ", error);
              }
}

async function SupprWork() {
        const btnsTrashCan = document.querySelectorAll(".trash")                   
        if (btnsTrashCan) {
                const works = await fetchWorks();

                btnsTrashCan.forEach((btnTrash, index) => {
                        const workIndex  = works[index];
                        const workId = workIndex.id;                        
                        btnTrash.addEventListener("click", function() {                                              
                        deleteParentDiv(workId);
                        deleteWork(workId);
                        });
                });
        }
}


async function imgModalPreview() {
        const fileInputImg = document.getElementById("imgMod");
        const imageModalContainerPreview = document.getElementById("imgPreviewContainer");
        const imageModalPreview = document.getElementById("imagePreview");
        const boxUpload = document.getElementById("boxUpload");
        const i = boxUpload.querySelector("i");
        const label = boxUpload.querySelector("label");
        const p = boxUpload.querySelector("p");
        
       try {
        fileInputImg.addEventListener("change", function(event) {
                const file = event.target.files[0];
                if(file) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                                imageModalPreview.src = e.target.result;
                                imageModalContainerPreview.style.display ="block";
                                i.style.display ="none";
                                label.style.display ="none";
                                p.style.display ="none";
                        }
                reader.readAsDataURL(file);
                } else {
                        imageModalPreview.style.display ="none";
                        imageModalContainerPreview.style.display ="none";
                }
        })

       } catch (error) {
        console.error("erreur lors de l'affichage ", error);
      }
        
        
}

async function resetImgModalPreview() {
        const imageModalContainerPreview = document.getElementById("imgPreviewContainer");
        const imageModalPreview = document.getElementById("imagePreview");
        const boxUpload = document.getElementById("boxUpload");
        const i = boxUpload.querySelector("i");
        const label = boxUpload.querySelector("label");
        const p = boxUpload.querySelector("p");

        imageModalPreview.src = "";
        imageModalContainerPreview.style.display ="none";
        i.style.display ="block";
        label.style.display ="block";
        p.style.display ="block";

};

async function addWork() {
                    
                // Récupère les éléments du formulaire
                const fileInput = document.getElementById("imgMod");
                const image = fileInput.files[0];
                const title = document.getElementById("titleMod").value;
                const categoryId = document.getElementById("categorieMod").value;
                      console.log (image);   
                      console.log(title); 
                      console.log(categoryId);  
            
                if (!image) {
                    console.error('Aucun fichier sélectionné.');
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




/* 



*/