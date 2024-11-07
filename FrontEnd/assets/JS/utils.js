


// message alertes succès ou erreur
export function displayMessage(elementId, message, color) {
  if (color) {
    document.getElementById(elementId).style.color = color    
    document.getElementById(elementId).innerText = message
  }
  document.getElementById(elementId).innerText = message
  }
  
  

 // suppression message alertes Modal

export function deleteMsgModal() {
    const msgAddForm = document.getElementById("msgAddForm");
    const msgDel = document.getElementById("msgDel");
  
    if (msgAddForm && msgAddForm.innerText !=="") {
      msgAddForm.innerText = "";
      msgAddForm.style.color = "#B1663C";
    }  
    if(msgDel && msgDel.innerText !=="")
      {
        msgDel.innerText = "";
        msgDel.style.color = "#B1663C";
      }  
}

// suppression message alertes Login
export function deleteMsgLogin() {
    document.getElementById("msgLogin").innerText = "";
  }

  