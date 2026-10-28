const form = document.getElementById("propForm");
const list = document.getElementById("propList");
const typeInput = document.getElementById("type");
const statusInput = document.getElementById("status");
const featuredInput = document.getElementById("featured");
const titleInput = document.getElementById("title");
const priceInput = document.getElementById("price");
const locationInput = document.getElementById("location");
const sizeInput = document.getElementById("size");
const roomsInput = document.getElementById("rooms");
const bathsInput = document.getElementById("baths");
const descriptionInput = document.getElementById("description");
const imageInput = document.getElementById("image");
const galleryInput = document.getElementById("gallery");

//editar propiedades//
let editingId = null;

function generateWhatsAppLink(title){

  return `https://wa.me/584126563284?text=Hola,%20quiero%20info%20sobre%20${encodeURIComponent(title)}`;
}
whatsapp: generateWhatsAppLink(titleInput.value)

// guardar propiedad
form.addEventListener("submit", function(e){
  e.preventDefault();

  const newProp = {
  id: editingId || Date.now().toString(),
    type:typeInput.value,
    status: statusInput.value,
    featured: featuredInput.checked,
    title: titleInput.value,
    price: priceInput.value,
    location: locationInput.value,
    size: sizeInput.value,
    rooms: roomsInput.value,
    baths: bathsInput.value,
    description: descriptionInput.value,
    image: imageInput.value,

    gallery: galleryInput.value
      ? galleryInput.value
          .split(",")
          .map(img => img.trim())
          .filter(img => img !== "")
      : [],
whatsapp: generateWhatsAppLink(titleInput.value)
  };

  if(editingId){

  properties = properties.map(prop => {
    return prop.id === editingId
      ? newProp
      : prop;
  });

  editingId = null;

} else {

  properties.push(newProp);
}
  saveProperties();

  form.reset();
  galleryInput.value = "";
featuredInput.checked = false;
  editingId = null;
  render();
});

/* =========================
EXPORTAR JSON
========================= */
const exportBtn = document.getElementById("exportBtn");
exportBtn.addEventListener("click", () => {

  const data = JSON.stringify(properties, null, 2);

  const blob = new Blob([data], {
    type: "application/json"
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = "propiedades.json";

  a.click();

  URL.revokeObjectURL(url);
});


/* =========================
IMPORTAR JSON
========================= */
const importFile = document.getElementById("importFile");
importFile.addEventListener("change", (e) => {

  const file = e.target.files[0];

  if(!file) return;

  const reader = new FileReader();

  reader.onload = function(event){

    try{

      const importedProps =
        JSON.parse(event.target.result);

      if(!Array.isArray(importedProps)){
        alert("JSON inválido");
        return;
      }

      properties = importedProps;

      saveProperties();

      render();

      alert("Propiedades importadas");

    } catch(error){

      alert("Error al importar JSON");

      console.error(error);
    }
  };

  reader.readAsText(file);
});
render();