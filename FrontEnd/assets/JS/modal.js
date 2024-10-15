import { getWorks } from "./api.js";


// ajout/suppression de la class active pour gérer l'affichage de la modale

const modalContainer = document.querySelector(".modal-container");
let modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

function toggleModal(){modalContainer.classList.toggle("active")}


// affichage du contenu du modal 1

// function pour récupération des images  et affichage des div modifier et mettre grid et crer imgbox
function renderWorksModal(works)  {
                        
      if(divImgBoxMod) {
        works.forEach((work) => {
          const image = document.createElement("img");
          image.src = work.imageUrl;
          const trashCan = document.createElement("i");
          trashCan.classList.add("fa-xs fa-solid fa-trash-can trash");      
          
          divImgBoxMod.appendChild(image);
          divImgBoxMod.appendChild(trashCan);
        })}
        else {console.error("L'élément .imgboxmod n'a pas été trouvé")};
}

async function initMod() {
        try {
                let works = await getWorks();
                console.log(works)
                renderWorksModal(works);                        
        } catch (error) {console.error("Erreur lors de la récupération des travaux")}
};

// vérification de la class active
const modalActive = document.querySelector(".modal-container.active")

// affichage du contenu
document.addEventListener("DOMContentLoaded", function() {
        fetch("./modal/modal1.html")
        .then((response) => response.text())
        .then((data) => {
        document.getElementById("modal").innerHTML = data;        
        let modalTriggers = document.querySelectorAll(".modal-trigger");
        modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal));
        const checkImgBoxLoaded = () => {
                const divImgBoxMod = document.querySelector(".imgBoxMod");  
                if (divImgBoxMod) {
                        initMod();              
                 }
                else {
                        setTimeout(checkImgBoxLoaded,50);
                }
        };
        checkImgBoxLoaded();
        }) 
        .catch((error) => console.error("erreur lors du chargement des fichiers", error));
})

// pour chaque image modifier le contenu de la div

// addeventListener sur poubelle pour supprimer image par id

// addeventListener sur bouton ajouter pour afficher la modal 2



/* 
import du fichier api

// la fonction est enclenchée par le click sur btn modifier (voir js index)
        // > affichage modale + page 1 : chagement du fichier 1 en html dans la div + possibilité de supprimer les données
        // addeventlistener sur le bouton ajouter sur cette page
        // > affichage de la page 2 avec bouton retour : chagement du fichier 2 en html dans la div 
                + possibilité de revenir sur l'affichage page1 avec la flèche
        // addeventlistener sur le bouton valider sur cette page : poste les élément et vide le formulaire      



        // utilisation de form-data pour send work

*/