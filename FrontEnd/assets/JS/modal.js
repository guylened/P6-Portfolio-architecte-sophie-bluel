import { fetchWorks, fetchCategories, deleteWork } from "./api.js";
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
                const parentDiv = workId.parentElement;
                parentDiv.remove();
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
                        deleteWork(workId);
                        deleteParentDiv(workId);
                        });
                });
        }
}
    


/* 


// la fonction est enclenchée par le click sur btn modifier (voir js index)
        // > affichage modale + page 1 : chagement du fichier 1 en html dans la div + possibilité de supprimer les données
        // addeventlistener sur le bouton ajouter sur cette page
        // > affichage de la page 2 avec bouton retour : chagement du fichier 2 en html dans la div 
                + possibilité de revenir sur l'affichage page1 avec la flèche
        // addeventlistener sur le bouton valider sur cette page : poste les élément et vide le formulaire      



        // utilisation de form-data pour send work

*/