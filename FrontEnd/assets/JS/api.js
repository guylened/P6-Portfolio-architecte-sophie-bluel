// Récupération des projets
export const getWorks = async () => {
  try {
    const data = await fetch("http://localhost:5678/api/works").then(
      (response) => response.json()
    );

    return data;
  } catch (e) {
    console.log("error:", { e });
  }
};

// Récupération des catégories

export const getCategories = async () => {
  try {
    const data = await fetch("http://localhost:5678/api/categories").then(
      (response) => response.json()
    );
    return data;
  } catch (e) {
    console.log("error:", { e });
  }
};


// suppression des données d'un projet
export const deleteWork = async (workId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {      
      throw new Error("Token non disponible");
    }
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.error(`HTTP error : ${response.status}`);
      document.getElementById("msgDel").innerText =
        `Erreur: le projet n'a pas été supprimé : ${response.status}`;
        setTimeout(deleteMsgModal, 6000); 
    } else {
      document.getElementById("msgDel").style.color = "#1D6154"
      document.getElementById("msgDel").innerText =
        "Le projet a été supprimé avec succès";
        setTimeout(deleteMsgModal, 2000); 
    }
  } catch (error) {
    console.error("erreur lors de la supression: ", error);
    document.getElementById("msgDel").innerText = "Erreur : Token non disponible ou erreur serveur";
    setTimeout(deleteMsgModal, 6000); 
  }
};

// ajout des données d'un projet
export const addWork = async (formData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {      
      throw new Error("Token non disponible");      
    }
    const response = await fetch(`http://localhost:5678/api/works/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!response.ok) {
      console.error(`HTTP error : ${response.status}`);
      document.getElementById("msgAddForm").innerText =
        `Erreur serveur : le projet n'a été ajouté à la base de données : ${response.status}`;   
        setTimeout(deleteMsgModal, 6000); 
    }

    const result = await response.json();
    console.log("Work ajouté avec succès :", result);
    document.getElementById("msgAddForm").style.color = "#1D6154";
    document.getElementById("msgAddForm").innerText = "Le projet a été ajouté avec succès";
    setTimeout(deleteMsgModal, 2000);
    return result;
  } catch (error) {
    console.error("erreur lors de l'ajout: ", error);
    document.getElementById("msgAddForm").innerText = "Erreur : Token non disponible ou erreur serveur";
    setTimeout(deleteMsgModal, 6000);
    
  }
};

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