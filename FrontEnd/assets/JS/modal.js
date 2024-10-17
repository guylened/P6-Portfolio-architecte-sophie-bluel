import { fetchWorks, fetchCategories, deleteWork } from "./api.js";


// ajout/suppression de la class active pour gérer l'affichage de la modale

const modalContainer = document.querySelector(".modal-container");
let modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

function toggleModal(){modalContainer.classList.toggle("active")}


// function pour création des éléments et affichage des images
function renderWorksModal(works)  {
let gridImgModal = document.querySelector(".gridImgModal");               
      if(gridImgModal) {
        works.forEach((work) => {
        const imgBoxMod = document.createElement("div");
        imgBoxMod.classList.add("imgBoxMod");     
        const image = document.createElement("img");
        image.src = work.imageUrl;
        const trashCan = document.createElement("i");
        trashCan.classList.add("fa-xs", "fa-solid", "fa-trash-can", "trash");      
        gridImgModal.appendChild(imgBoxMod)
        imgBoxMod.appendChild(image);
        imgBoxMod.appendChild(trashCan);
        })}
        else {console.error("L'élément gridImgModal n'a pas été trouvé")};
}

async function initMod() {
        try {
                const works = await fetchWorks();
                const categories = await fetchCategories();               
                renderWorksModal(works);                        
        } catch (error) {console.error("Erreur lors de la récupération des travaux")}
};

// addeventListener sur bouton ajouter pour afficher la modal 2
async function btnToModal2() {
        const btnAjout = document.getElementById("btnModal1")        
        if (btnAjout) {        
                btnAjout.addEventListener("click", function() {
                        fetch("./modal/modal2.html")
                        .then((response) => response.text())
                        .then((data) => {
                        document.getElementById("modal").innerHTML = data;
                        let modalTriggers = document.querySelectorAll(".modal-trigger");
                        modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal));
                        btnToModal1();
                }) 
        })
        .catch((error) => console.error("erreur lors du chargement des fichiers", error));
        }
        }

// addeventListener sur bouton flèche gauche pour afficher la modale 1
async function btnToModal1() {
        const btnArrow = document.getElementById("btnArrow")  
        console.log(btnArrow)      
        if (btnArrow) {        
                btnArrow.addEventListener("click", loadModal1()) }
                
        }
                

// affichage du contenu de la modale 1
function loadModal1() {
document.addEventListener("DOMContentLoaded", function() {
        fetch("./modal/modal1.html")
        .then((response) => response.text())
        .then((data) => {
        document.getElementById("modal").innerHTML = data;
        let modalTriggers = document.querySelectorAll(".modal-trigger");
        modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal));  
        initMod();    
        btnToModal2();
        }) 
        .catch((error) => console.error("erreur lors du chargement des fichiers", error));
})
};
loadModal1();


// addeventListener sur poubelle pour supprimer image par id
/*async function deleteWork(works) {}

document.addEventListener("DOMContentLoaded", function() {
const btnsTrashCan = document.querySelectorAll(".trash")
btnsTrashCan.forEach(btnTrash => btnTrash.addEventListener("click", deleteWork));
})*/





/* 


// la fonction est enclenchée par le click sur btn modifier (voir js index)
        // > affichage modale + page 1 : chagement du fichier 1 en html dans la div + possibilité de supprimer les données
        // addeventlistener sur le bouton ajouter sur cette page
        // > affichage de la page 2 avec bouton retour : chagement du fichier 2 en html dans la div 
                + possibilité de revenir sur l'affichage page1 avec la flèche
        // addeventlistener sur le bouton valider sur cette page : poste les élément et vide le formulaire      



        // utilisation de form-data pour send work

*/