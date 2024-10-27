import { login } from "./api.js";

function disabledSubmit() {
    document.getElementById("submit").disabled = true;
}

function verifForm() {
    document.getElementById("loginForm").addEventListener("input", () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const submitButton = document.getElementById("submit");
    if(email !== '' && password != '')
    {
        submitButton.disabled = false;
        submitButton.classList.add("active");
        document.getElementById("pValid").innerText = "";
 
    } else {
        submitButton.disabled = true;
        submitButton.classList.remove("active");
        document.getElementById("pValid").innerText="Veuillez compléter tous les champs"        

    }
    })
}

function validateEmail() {
    const emailPattern = /^[a-zA-Z0-9]([-_.]?[a-zA-Z0-9])*@[a-zA-Z0-9]([-.]?[a-zA-Z0-9])*\.([a-z]{2,4})$/;
    const emailInput = document.getElementById("email");
    emailInput.addEventListener("change", () => {
   
        if(!emailPattern.test(emailInput.value)) {
            document.getElementById("spanEmail").innerText=" Le format est invalide";
            document.getElementById("submit").disabled = true;    
            document.getElementById("submit").classList.remove("active");   
        } else {
            document.getElementById("spanEmail").innerText = ""
        }    
    
    });

}



 document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();  
    const email = document.getElementById("email").value;   
    const password = document.getElementById("password").value;   
    const emailPattern = /^[a-zA-Z0-9]([-_.]?[a-zA-Z0-9])*@[a-zA-Z0-9]([-.]?[a-zA-Z0-9])*\.[a-z]{2,4}$/;
    if (!emailPattern.test(email)) {
        document.getElementById("spanEmail").innerText = " Le format est invalide";
        return; 
     } 
    login(email, password); 
})

// Initialisation des fonctions 
disabledSubmit();
verifForm();
validateEmail();
