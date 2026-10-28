function render(){

  let html = "";

  properties.forEach((prop) => {

    html += `
      <div class="card">

        <img
          src="${prop.image}"
          class="dashboard-thumb"
        >

        <h3>${prop.title}</h3>

        <p>${prop.location}</p>

        <b>${prop.price}</b>

        <button
          onclick="editProp('${prop.id}')"
          class="btn mt-12"
        >
          Editar
        </button>

        <button
          onclick="deleteProp('${prop.id}')"
          class="btn btn-ghost mt-12"
        >
          Eliminar
        </button>

      </div>
    `;
  });

  list.innerHTML = html;
}