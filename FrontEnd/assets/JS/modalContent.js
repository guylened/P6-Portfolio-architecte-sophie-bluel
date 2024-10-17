//Modal 1 

const htmlContentMod1 = {
    titre:'Galerie photo',
    btn:'Ajouter une photo',
}


const htmlElementMod1 = `
<i class="fa-lg fa-solid fa-xmark close-modal modal-trigger"></i>
<h3>${htmlContentMod1.titre}</h3> 
<div class="gridImgModal"></div>
<button id="btnModal1" class="btnModal">${htmlContentMod1.btn}</button>
`;

// Modal 2

const htmlContentMod2 = {
    titre:'Ajout photo',
    labelPhoto: '+ Ajouter photo',
    infoPhoto: 'jpg, png : 4Mo max',
    labelT: 'Titre',
    labelC: 'Catégorie',
    option: '--Choisissez dans la liste--',
    btn:'Valider',
}


const htmlElementMod2 = `
<i id="btnArrow" class="fa-lg fa-solid fa-arrow-left navLeftMod"></i>
<i class="fa-lg fa-solid fa-xmark close-modal modal-trigger"></i>
<h3>${htmlContentMod2.titre}</h3> 
 <form class="formModal">
    <div class="boxUpload">
        <i class="fa-5x fa-regular fa-image imgUpload"></i>
        <label for="imgMod" class="labelUpload">${htmlContentMod2.labelPhoto}</label>
        <input type="file" name="imgMod" id="imgMod" accept="image/png, image/jpg"/>
        <p>${htmlContentMod2.infoPhoto}</p>
    </div>        
        <label for="titleMod">${htmlContentMod2.labelT}</label>
        <input type="text" name="titleMod" id="titleMod">
        <label for="categorieMod">${htmlContentMod2.labelC}</label>
        <select name="categorieMod" id="categorieMod">
            <option value="">${htmlContentMod2.option}</option>
        </select>
</form>
<button id="btnModal2" class="btnModal2">${htmlContentMod2.btn}</button>
`;

