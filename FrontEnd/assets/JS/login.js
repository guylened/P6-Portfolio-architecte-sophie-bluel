import { login } from "./api.js";




const loginForm = document.getElementById("loginForm")
loginForm.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log(event)
    const email = document.getElementById("email").value;   
    const password = document.getElementById("password").value;    
    login(email, password); 
})

   /* if (login.status == 200) {
        getUserInfo();
        localStorage.setItem('token');
        return " Vous êtes connectée"


    } else {
       return  "Vous n'êtes pas habilité  ou le serveur ne répond pas"
    }*/


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
// faire page de logout