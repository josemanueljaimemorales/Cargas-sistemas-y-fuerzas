const password = "jmjm0808";

let data = JSON.parse(localStorage.getItem("data")) || {
  obligatorios: {
    "Rep elementos corrección": "",
    "Rep elementos proyección": "",
    "Cantidad de rutinas": "",
    "D2 elementos corrección": "",
    "D2 elementos proyección": "",
    "Rutinas sin caídas": "",
    "Intentos máximo": ""
  },
  sistemas: {
    "Semana de fuerza": "",
    "Abdomen CBR": "",
    "PF paralelas": "",
    "Core barra": "",
    "Uchimura": "",
    "ABC y planchas": "",
    "Plantados": "",
    "Brazos flexionados": "",
    "Brazos extendidos": "",
    "Fuerza Cristos": "",
    "Patadas": ""
  },
  semanal: {
    "Secuencias básicas": "",
    "Corrección de elementos": "",
    "Elementos nuevos": "",
    "Número de repeticiones": "",
    "Rutinas completas": "",
    "Rep correcciones": "",
    "Repetición de elementos nuevos": "",
    "Corrección de errores": "",
    "Enlaces de rutina": "",
    "Elementos por enlace": ""
  }
};

function guardar() {
  localStorage.setItem("data", JSON.stringify(data));
}

function mostrar(tipo) {
  let html = "<h2>" + tipo + "</h2>";

  if (tipo === "obligatorios") {

    html += "<div class='card'><h3>Día 1 - Rutinas</h3>";
    html += `
      <p>Repetición de elementos de corrección: ${data.obligatorios["Rep elementos corrección"]}</p>
      <p>Repetición de elementos de proyección: ${data.obligatorios["Rep elementos proyección"]}</p>
      <p>Cantidad de rutinas: ${data.obligatorios["Cantidad de rutinas"]}</p>
    </div>`;

    html += "<div class='card'><h3>Día 2 - Corrección y proyección</h3>";
    html += `
      <p>Elementos de corrección: ${data.obligatorios["D2 elementos corrección"]}</p>
      <p>Elementos de proyección: ${data.obligatorios["D2 elementos proyección"]}</p>
    </div>`;

    html += "<div class='card'><h3>Día 3 - Rutinas a presentar</h3>";
    html += `
      <p>Rutinas sin caídas: ${data.obligatorios["Rutinas sin caídas"]}</p>
      <p>No más de intentos: ${data.obligatorios["Intentos máximo"]}</p>
    </div>`;
  } else {
    for (let key in data[tipo]) {
      html += `<div class="card"><p>${key}: ${data[tipo][key]}</p></div>`;
    }
  }

  document.getElementById("contenido").innerHTML = html;
}

function login() {
  let pass = prompt("Contraseña:");
  if (pass === password) editar();
}

function editar() {
  let html = "<h2>Modo Entrenador</h2>";

  for (let tipo in data) {
    html += "<h3>" + tipo + "</h3>";
    for (let key in data[tipo]) {
      html += `
        <div class="card">
          <label>${key}</label>
          <textarea onchange="actualizar('${tipo}','${key}', this.value)">${data[tipo][key]}</textarea>
        </div>
      `;
    }
  }

  document.getElementById("contenido").innerHTML = html;
}

function actualizar(tipo, key, value) {
  data[tipo][key] = value;
  guardar();
}
