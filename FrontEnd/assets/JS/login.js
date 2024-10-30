
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
        document.getElementById("msgLogin").innerText="Erreur dans l’identifiant ou le mot de passe";                 
      }
      const data = await response.json();  
      localStorage.setItem("token", data.token);    
      window.location = "/FrontEnd/index.html";
    } catch (error) {
      console.error("error during login: ", error);
    }
  };
  

function disabledSubmit() {
    document.getElementById("submit").disabled = true;
}

function verifForm() {
    document.getElementById("loginForm").addEventListener("input", () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const submitButton = document.getElementById("submit");
    if( document.getElementById("spanEmail").innerText == "" && email !== '' && password != '')
    {
        submitButton.disabled = false;
        submitButton.classList.add("active");
        document.getElementById("msgLogin").innerText = "";
 
    } else {
        submitButton.disabled = true;
        submitButton.classList.remove("active");
        document.getElementById("msgLogin").innerText="Veuillez compléter tous les champs"        

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
});

// Initialisation des fonctions 
disabledSubmit();
verifForm();
validateEmail();
