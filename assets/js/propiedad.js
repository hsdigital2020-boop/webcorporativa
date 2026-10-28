document.addEventListener("DOMContentLoaded", () => {

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const props = JSON.parse(localStorage.getItem("props")) || [];

const prop = props.find(p => p.id == id);

if (!prop) {
  document.querySelector("main").innerHTML = "<h2>Propiedad no encontrada</h2>";
  return;
}

  document.getElementById("propTitle").textContent = prop.title;
  document.getElementById("propLocation").textContent = prop.location;
  document.getElementById("propPrice").textContent = prop.price;
  document.getElementById("propStatus").innerHTML = `
  <div class="status-badge status-${prop.status}">
    ${prop.status}
  </div>
`;

const mainPhoto =
  document.getElementById("mainPhoto");

mainPhoto.src =
  prop.image || "assets/no-image.png";

mainPhoto.onerror = () => {
  mainPhoto.src = "assets/no-image.png";
};

  document.getElementById("propDescription").textContent =
    prop.description || "Sin descripción disponible";

  document.getElementById("propSize").innerHTML = `📐 <b>${prop.size || "-"}</b>`;
  document.getElementById("propRooms").innerHTML = `🛏️ <b>${prop.rooms || "-"}</b>`;
  document.getElementById("propBaths").innerHTML = `🛁 <b>${prop.baths || "-"}</b>`;

  const galleryContainer = document.getElementById("propGallery");

if(prop.gallery && prop.gallery.length > 0){

  galleryContainer.innerHTML = "";

  prop.gallery.forEach(img => {

    galleryContainer.innerHTML += `
      <img
        src="${img}"
        alt="Imagen propiedad"
        loading="lazy"
        decoding="async"
        onerror="this.onerror=null;this.src='assets/no-image.png';"
      >
    `;

  });

}
galleryContainer
  .querySelectorAll("img")
  .forEach(img => {
  img.addEventListener("click", () => {
    mainPhoto.src = img.src;
  });
});

  const waLink = prop.whatsapp || "#";
  document.getElementById("propWhatsapp").href = waLink;
  document.getElementById("propWhatsappSticky").href = waLink;

});