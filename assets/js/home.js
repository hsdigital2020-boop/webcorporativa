const featuredContainer =
  document.getElementById("featuredProps");

const properties =
  JSON.parse(localStorage.getItem("props")) || [];

const featured =
  properties.filter(prop => prop.featured);


if(featured.length === 0){

  featuredContainer.innerHTML = `
    <p>No hay propiedades destacadas.</p>
  `;

} else {

  featured.forEach(prop => {

    featuredContainer.innerHTML += `
      <article class="card">

        <img
  class="img"
  src="${prop.image || 'assets/no-image.png'}"
  alt="${prop.title}"
  loading="lazy"
  decoding="async"
  onerror="this.onerror=null;this.src='assets/no-image.png';"
>

        <div class="body">

          <div class="status-badge status-${prop.status}">
            ${prop.status}
          </div>

          <div class="title">
            ${prop.title}
          </div>

          <div class="price">
            ${prop.price}
          </div>

          <div class="meta">
            ${prop.location}
          </div>

          <div class="btnrow">

            <a
              class="btn btn-wa"
              href="${prop.whatsapp}"
              target="_blank"
            >
              💬 WhatsApp
            </a>

            <a
              class="btn btn-ghost"
              href="propiedad.html?id=${prop.id}"
            >
              Ver detalles
            </a>

          </div>

        </div>

      </article>
    `;
  });
}