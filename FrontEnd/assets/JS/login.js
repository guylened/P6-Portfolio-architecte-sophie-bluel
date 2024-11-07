import {deleteMsgLogin, displayMessage} from "./utils.js";


const emailPattern = /^[a-zA-Z0-9]([-_.]?[a-zA-Z0-9])*@[a-zA-Z0-9]([-.]?[a-zA-Z0-9])*\.[a-z]{2,4}$/;

function redirectUser() {
    window.location = "/FrontEnd/index.html";
}

// Connexion et récupération token
const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5678/api/users/login", {
        method: 'POST', 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({email, password})
      });
      if(!response.ok) { 
        console.error("HTTP error " + response.status); 
        displayMessage("msgLogin", "Erreur dans l’identifiant ou le mot de passe");        
        document.getElementById("loginForm").addEventListener("input", () => {
          deleteMsgLogin(); });
        return;             
      }
      const data = await response.json();  
      localStorage.setItem("token", data.token);
      displayMessage("msgLogin", "Authentification réussie", "#1D6154")     
      setTimeout(redirectUser, 1000); 
      
    } catch (error) {
      console.error("error during login: ", error);
      displayMessage("msgLogin", "Erreur serveur");      
      setTimeout(deleteMsgLogin, 4000);
    }
  };
  

function submitForm() {
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();  
        let isError = false;
        let email = document.getElementById("email").value;   
        let password = document.getElementById("password").value;  
        
       
        if (!emailPattern.test(email)) {
            isError = true;
            displayMessage("spanEmail", " Le format est invalide");
            document.getElementById("email").addEventListener("input", () => {
            document.getElementById("spanEmail").innerText = ""; });
             
         } 
        if (email==="") {
          isError = true;
          displayMessage("msgLogin", "Veuillez compléter tous les champs");         
          document.getElementById("email").addEventListener("input", () => {
            deleteMsgLogin(); });

        }
        if (password==="") {
          isError = true;
          displayMessage("msgLogin", "Veuillez compléter tous les champs");
          document.getElementById("password").addEventListener("input", () => {
            deleteMsgLogin(); });

        }
        if (!isError) {
          login(email, password);        

        }        
    });
}



 

// Initialisation des fonctions
submitForm();

