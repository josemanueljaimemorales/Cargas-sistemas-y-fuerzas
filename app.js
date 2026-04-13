const firebaseConfig = {
  apiKey: "AIzaSyBhs-MEQ7McQhs6pNZTa1AWqWwUYp8yvbU",
  authDomain: "app-de-cargas-865db.firebaseapp.com",
  projectId: "app-de-cargas-865db",
  storageBucket: "app-de-cargas-865db.firebasestorage.app",
  messagingSenderId: "848399214095",
  appId: "1:848399214095:web:dd2f91ec522f2b5f44a57a"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const password = "jmjm0808";

let data = {
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

function fila(t, v){
  return `<div class="item"><div class="label">${t}</div><div class="valor">${v || "-"}</div></div>`;
}

function mostrar(tipo){
  let html = "";

  if(tipo==="obligatorios"){
    html+=`<div class="card"><h3>Día 1 - Rutinas</h3>
    ${fila("Repetición elementos corrección", data.obligatorios["Rep elementos corrección"])}
    ${fila("Repetición elementos proyección", data.obligatorios["Rep elementos proyección"])}
    ${fila("Cantidad de rutinas", data.obligatorios["Cantidad de rutinas"])}
    </div>`;

    html+=`<div class="card"><h3>Día 2 - Corrección y proyección</h3>
    ${fila("Elementos corrección", data.obligatorios["D2 elementos corrección"])}
    ${fila("Elementos proyección", data.obligatorios["D2 elementos proyección"])}
    </div>`;

    html+=`<div class="card"><h3>Día 3 - Rutinas a presentar</h3>
    ${fila("Rutinas sin caídas", data.obligatorios["Rutinas sin caídas"])}
    ${fila("No más de intentos", data.obligatorios["Intentos máximo"])}
    </div>`;
  } else {
    for(let k in data[tipo]){
      html+=`<div class="card">${fila(k, data[tipo][k])}</div>`;
    }
  }
document.getElementById("contenido").innerHTML = "";
  document.getElementById("contenido").innerHTML = html;
}

function guardar(){
  db.collection("gym").doc("data").set(data);
}

function cargar(){
  db.collection("gym").doc("data").onSnapshot(doc=>{
    if(doc.exists){
      data = doc.data();
    }
  });
}
cargar();

function login(){
  let pass = prompt("Contraseña:");
  if(pass===password) editar();
}

function editar(){
  let html="<h2>Modo Entrenador</h2>";
  for(let tipo in data){
    html+=`<h3>${tipo}</h3>`;
    for(let k in data[tipo]){
      html+=`<div class="card">
      <label>${k}</label>
      <textarea onchange="actualizar('${tipo}','${k}',this.value)">${data[tipo][k]}</textarea>
      </div>`;
    }
  }
  document.getElementById("contenido").innerHTML=html;
}

function actualizar(tipo,key,val){
  data[tipo][key]=val;
  guardar();
}
