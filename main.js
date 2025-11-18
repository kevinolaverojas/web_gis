// Crear mapa
var map = L.map('map').setView([-37.47, -72.35], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);

let lat = null;
let lng = null;

// Cuando el usuario hace clic en el mapa
map.on('click', function(e) {
    lat = e.latlng.lat;
    lng = e.latlng.lng;

    document.getElementById("lat").value = lat.toFixed(6);
    document.getElementById("lng").value = lng.toFixed(6);
});

// Botón guardar
document.getElementById("guardar").addEventListener("click", function () {

    if (!lat || !lng) {
        document.getElementById("mensaje").innerHTML = "Haz clic en el mapa primero.";
        return;
    }

    let reporte = {
        latitud: lat,
        longitud: lng,
        tipo: document.getElementById("tipo").value,
        volumen: document.getElementById("volumen").value,
        peligro: document.getElementById("peligro").value,
        descripcion: document.getElementById("descripcion").value,
        foto: document.getElementById("foto").value,
        fecha: document.getElementById("fecha").value
    };

    console.log("Reporte guardado:", reporte);

    document.getElementById("mensaje").innerHTML = "Reporte guardado (ver consola).";

    // Limpia el formulario
    document.getElementById("tipo").value = "";
    document.getElementById("volumen").value = "";
    document.getElementById("peligro").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("foto").value = "";
    document.getElementById("fecha").value = "";
});
