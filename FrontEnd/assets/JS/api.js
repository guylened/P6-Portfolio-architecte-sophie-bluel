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
        "Erreur: le projet n'a pas été supprimé";
    } else {
      document.getElementById("msgDel").classList.add("valid");
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
        "Erreur : le projet n'a été ajouté à la base de données";
    }

    const result = await response.json();
    console.log("Work ajouté avec succès :", result);
    return result;
  } catch (error) {
    console.error("erreur lors de l'ajout: ", error);
  }
};
