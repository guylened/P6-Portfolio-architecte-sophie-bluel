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
    localStorage.setItem("token", data.token);
    window.location = "/FrontEnd/index.html";
  } catch (error) {
    console.error("error during login: ", error);
  }
};

export const deleteWork = async (id) => {
  try {
  const response = await fetch("http://localhost:5678/api/works/{id}", {
    method: 'DELETE',
    body: JSON.stringify({id})
  });
  if(!response.ok) { throw new Error("HTTP error " + response.status); }
} catch (error) {
  console.error("error suprr: ", error);
}
}




// si problème de port/origin redémarrer backend avec powershell

