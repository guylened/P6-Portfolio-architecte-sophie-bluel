import { login } from "./api.js";

const loginForm = document.getElementById("loginForm")
loginForm.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log(event)
    const email = document.getElementById("email").value;   
    const password = document.getElementById("password").value;    
    login(email, password); 
})
