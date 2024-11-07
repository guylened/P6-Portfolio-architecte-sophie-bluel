import { deleteMsgModal, displayMessage, errorLogout } from "./utils.js";

// Récupération des projets
export const getWorks = async () => {
  try {
    const data = await fetch("http://localhost:5678/api/works").then(
      (response) => response.json()
    );

    return data;
  } catch (e) {
    console.log("error:", { e });
    displayMessage(
      "manageWorks",
      "Erreur connexion serveur, veuillez contacter l'administrateur",
      "#b1663c"
    );
    setTimeout(errorLogout,1000);
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
    displayMessage(
      "manageWorks",
      "Erreur connexion serveur, veuillez contacter l'administrateur",
      "#b1663c"
    );
    setTimeout(errorLogout,500);
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
      throw new Error(`HTTP error : ${response.status}`);
      
    } else {
      displayMessage(
        "msgDel",
        "Le projet a été supprimé avec succès",
        "#1D6154"
      );
      setTimeout(deleteMsgModal, 2000);
    }
    return response;
  } catch (error) {
    console.error("erreur lors de la suppression: ", error);
    displayMessage("msgDel", "Erreur suppression : Token non disponible ou erreur serveur");    
    setTimeout(errorLogout,3000);
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
      throw new Error(`HTTP error : ${response.status}`);      
    }

    const result = await response.json();
    displayMessage(
      "msgAddForm",
      "Le projet a été ajouté avec succès",
      "#1D6154"
    );
    setTimeout(deleteMsgModal, 2000);
    return result;
  } catch (error) {
    console.error("erreur lors de l'ajout: ", error);
    displayMessage(
      "msgAddForm",
      "Erreur ajout : Token non disponible ou erreur serveur"
    );    
    setTimeout(errorLogout,3000);
  }
};
