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
      document.getElementById("msgAddForm").innerText = "Erreur : Token non disponible";
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
    } else {
      document.getElementById("msgDel").style.color = "#1D6154"
      document.getElementById("msgDel").innerText =
        "Le projet a été supprimé avec succès";
    }
  } catch (error) {
    console.error("erreur lors de la supression: ", error);
  }
};

// ajout des données d'un projet
export const addWork = async (formData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      document.getElementById("msgAddForm").innerText = "Erreur : Token non disponible";
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
    }

    const result = await response.json();
    console.log("Work ajouté avec succès :", result);
    document.getElementById("msgAddForm").style.color = "#1D6154";
    document.getElementById("msgAddForm").innerText = "Le projet a été ajouté avec succès";
    return result;
  } catch (error) {
    console.error("erreur lors de l'ajout: ", error);
    
  }
};

export function deleteMsgModal() {
  document.getElementById("msgAddForm").innerText = "";
   document.getElementById("msgDel").innerText = "";
   document.getElementById("msgAddForm").style.color = "#B1663C";
   document.getElementById("msgDel").style.color = "#B1663C";

}