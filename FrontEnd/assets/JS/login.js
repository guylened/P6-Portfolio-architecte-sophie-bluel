import { login } from "./api.js";




const submit = document.getElementById("submit")
submit.addEventListener("submit", function() {
    
    if (login.statut == 200) {

    }

} )
/*
 // fonctions vérification contenu champs du formulaire

 // addeventlister sur bouton submit 
 
  // clic lance vérification validité champs 
    // si non valide  = message erreur 
    // si juste =
         // lancer post User  et récupération statut
            // si = 200
                // récupération token (et user iD) en local storage
                    const UserInfo = await getUserInfo();
                (// modification du link login : innerhtml = logout (sur les 2 pages + suppression lien vers page link) dans le fichier index)
                // ajout en innerHTML du bouton modifier à gallery // dans le fichier index
                // redirection sur page d'accueil          
            // si statut autre = renvoie message d'erreur serveur - rééssayer ultérieurement 
*/


// supprimer required dans html login sinon bug de verif regex