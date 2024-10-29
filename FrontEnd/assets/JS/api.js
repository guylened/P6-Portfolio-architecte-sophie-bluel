

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
    const token = localStorage.getItem("token")
  if(!token) {
    throw new Error("Token non disponible")
  }
  const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  if(!response.ok) { throw new Error(`HTTP error : ${response.status}`); }  
  
} catch (error) {
  console.error("erreur lors de la supression: ", error);
}
}

// ajout des données d'un projet
export const addWork = async (formData) => {
  try {
    const token = localStorage.getItem("token");    
    
  if(!token) {
    throw new Error("Token non disponible")
  }
  const response = await fetch(`http://localhost:5678/api/works/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,    
    },
    body: formData,
  });
  if(!response.ok) { throw new Error(`HTTP error : ${response.status}`); } 
  
  const result = await response.json();
  console.log('Work ajouté avec succès :', result);
  
} catch (error) {
  console.error("erreur lors de l'ajout: ", error);
}
}
