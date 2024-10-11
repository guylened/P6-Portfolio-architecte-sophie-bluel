/* Récupération données Backend*/
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
  

  

export const login = async (email, password) => {
  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: 'POST', 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({email, password})
    });
    if(!response.ok) { throw new Error("HTTP error " + response.status);          
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error during login: ", error);
  }
};

