const donnees = await fetch("http://localhost:5678/api/works")

const sectionGallery = document.querySelector(".gallery");

const image = document.createElement("img")
const legende = document.createElement("figcaption")

sectionGallery.appendChild(image);
sectionGallery.appendChild(legende);