const responseWorks =  fetch("http://localhost:5678/api/works").then(responseWorks => responseWorks.json());
/*const donneesWorks = responseWorks.json();*/

const responseCategories =  fetch("http://localhost:5678/api/Categories").then(responseCategories => responseCategories.json());
/*const donneesCategories = responseCategories.json();*/

const sectionGallery = document.querySelector(".gallery");


let image = document.createElement("img");
for (let i = 0; i < responseWorks.length; i++) {
    image.src = `${responseWorks[i].imageUrl}`
};

sectionGallery.appendChild(image);

let legende = document.createElement("figcaption");
for (let i = 0; i < responseWorks.length; i++) {
    legende.innerHTML = `${responseWorks[i].title}`
};

sectionGallery.appendChild(legende);