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
    const data = await fetch("http://localhost:5678/api/users/login", {
      method: 'POST',
      body: JSON.stringify({ email, password})
    }).then(
      (response) => response.json()
    );

    return data;
  } catch (e) {
    console.log("error:", { e });
  }
};
