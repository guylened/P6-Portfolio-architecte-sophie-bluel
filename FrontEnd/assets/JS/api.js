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

// Rrécupération des catégories

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
  