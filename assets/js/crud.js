function editProp(id){
   const prop = properties.find(prop => prop.id === id);
if(!prop) return;
editingId = id;
  typeInput.value = prop.type || "";
  statusInput.value = prop.status || "Disponible";
  featuredInput.checked = prop.featured || false;
  titleInput.value = prop.title;
  priceInput.value = prop.price;
  locationInput.value = prop.location;
  sizeInput.value = prop.size;
  roomsInput.value = prop.rooms;
  bathsInput.value = prop.baths;
  descriptionInput.value = prop.description;
  imageInput.value = prop.image;
  galleryInput.value = prop.gallery
  ? prop.gallery.join(",")
  : "";

}

// eliminar
function deleteProp(id){

  properties = properties.filter(prop => {
    return prop.id !== id;
  });

  saveProperties();

  render();
}