const container =
  document.getElementById("dynamicProps");

const searchInput =
  document.getElementById("searchInput");

const typeFilter =
  document.getElementById("typeFilter");

const priceFilter =
  document.getElementById("priceFilter");

const sortSelect =
  document.getElementById("sortProps");

const pagination =
  document.getElementById("pagination");

const itemsPerPage = 6;

let currentPage = 1;

const props =
  JSON.parse(localStorage.getItem("props")) || [];

  function parsePrice(price){

  return Number(
    price.replace(/[^0-9]/g, "")
  );

}

/* =========================
RENDER
========================= */

function renderProperties(data){

  container.innerHTML = "";

  if(data.length === 0){

    container.innerHTML =
      "<p>No se encontraron propiedades.</p>";

    pagination.innerHTML = "";

    return;
  }

  /* =========================
  PAGINACIÓN
  ========================= */

  const start =
    (currentPage - 1) * itemsPerPage;

  const end =
    start + itemsPerPage;

  const paginatedItems =
    data.slice(start, end);

  /* =========================
  RENDER CARDS
  ========================= */

  paginatedItems.forEach(prop => {

    container.innerHTML += `
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

  renderPagination(data);

}

/*=== render paginacion====*/
function renderPagination(data){

  pagination.innerHTML = "";

  const totalPages =
    Math.ceil(data.length / itemsPerPage);

  for(let i = 1; i <= totalPages; i++){

    pagination.innerHTML += `
      <button
        class="${i === currentPage ? 'active' : ''}"
        onclick="changePage(${i})"
      >
        ${i}
      </button>
    `;
  }
 }
/*=== cambio de pagina===*/
 function changePage(page){

  currentPage = page;

  applyFilters();

}
/* =========================
FILTROS
========================= */

function applyFilters(){

  const search =
      searchInput.value.toLowerCase();
         
  const type =
    typeFilter.value;

  const maxPrice =
    Number(priceFilter.value);

  const filtered = props.filter(prop => {

    const cleanPrice =
      Number(
        prop.price
          .replace("$","")
          .replace(/\./g,"")
          .replace(/,/g,"")
      );

    const matchesSearch =
      prop.title.toLowerCase().includes(search);

    const matchesType =
      !type || prop.type === type;

    const matchesPrice =
      !maxPrice || cleanPrice <= maxPrice;

    return (
      matchesSearch &&
      matchesType &&
      matchesPrice
    );
  });

  /* =========================
ORDENAR
========================= */

const sortValue =
  sortSelect.value;

if(sortValue === "low"){

  filtered.sort((a,b) => {
    return parsePrice(a.price)
      - parsePrice(b.price);
  });

}

if(sortValue === "high"){

  filtered.sort((a,b) => {
    return parsePrice(b.price)
      - parsePrice(a.price);
  });

}

if(sortValue === "recent"){

  filtered.reverse();

}

  renderProperties(filtered);
}


/* =========================
EVENTOS
========================= */

searchInput.addEventListener(
  "input",
  () => {
    currentPage = 1;
    applyFilters();
  }
);

typeFilter.addEventListener(
  "change",
  () => {
    currentPage = 1;
    applyFilters();
  }
);

priceFilter.addEventListener(
  "input",
  () => {
    currentPage = 1;
    applyFilters();
  }
);

sortSelect.addEventListener(
  "change",
  () => {
    currentPage = 1;
    applyFilters();
  }
);


/* =========================
INIT
========================= */

renderProperties(props);