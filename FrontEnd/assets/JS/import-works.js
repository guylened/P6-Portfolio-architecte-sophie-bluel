
/* Récupération données Backend*/
const responseWorks =  fetch("http://localhost:5678/api/works").then(responseWorks => responseWorks.json());
const responseCategories =  fetch("http://localhost:5678/api/Categories").then(responseCategories => responseCategories.json());


/*Récup id pour bouton tri*/
const btnAll = document.getElementById("all")
const btnObj = document.getElementById("obj")
const btnAprt = document.getElementById("aprt")
const btnHorest = document.getElementById("h&r")

/*Création de la galerie et récupération des données*/

for (let i = 0; i < responseWorks.length; i++) {

    const donneesWorks = responseWorks[i];
    

    const sectionGallery = document.querySelector(".gallery");

    const box = document.createElement("figure");
    const image = document.createElement("img");
    image.src = donneesWorks.imageUrl;
    const legende = document.createElement("figcaption");
    legende.innerHTML = donneesWorks.title;

    sectionGallery.appendChild(box);
    box.appendChild(image);
    box.appendChild(legende);

}


/*
let image = document.createElement("img");
for (let i = 0; i < responseWorks.length; i++) {
    image.src = `${responseWorks[i].imageUrl}`;
    sectionGallery.appendChild(image);
};



let legende = document.createElement("figcaption");
for (let i = 0; i < responseWorks.length; i++) {
    legende.innerHTML = `${responseWorks[i].title}`;
    sectionGallery.appendChild(legende);
};
*/


/*Tri de la galerie*/

/*
btnAll.addEventListener("click", function);
btnObj.addEventListener("click", function);
btnAprt.addEventListener("click", function);
btnHorest.addEventListener("click", function);

*/