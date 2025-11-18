<<<<<<< HEAD
// ===============================
// MAPA
// ===============================
var map = L.map('map').setView([-37.47, -72.35], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);

// ICONO PERSONALIZADO
var iconoBasural = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/565/565547.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40]
});

let marker = null;
let fotoBase64 = null;

// ===============================
// CLICK EN EL MAPA: MARCAR PUNTO
// ===============================
map.on("click", function(e) {

    let lat = e.latlng.lat.toFixed(6);
    let lng = e.latlng.lng.toFixed(6);

    document.getElementById("lat").value = lat;
    document.getElementById("lng").value = lng;

    if (marker) marker.remove();

    marker = L.marker([lat, lng], { icon: iconoBasural, draggable: true }).addTo(map);

    marker.on("dragend", function() {
        let pos = marker.getLatLng();
        document.getElementById("lat").value = pos.lat.toFixed(6);
        document.getElementById("lng").value = pos.lng.toFixed(6);
    });
});

// ===============================
// GPS
// ===============================
document.getElementById("gps").addEventListener("click", function() {
    if (!navigator.geolocation) {
        alert("GPS no disponible en este dispositivo.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        function(pos) {
            let lat = pos.coords.latitude;
            let lng = pos.coords.longitude;

            document.getElementById("lat").value = lat.toFixed(6);
            document.getElementById("lng").value = lng.toFixed(6);

            map.setView([lat, lng], 17);

            if (marker) marker.remove();
            marker = L.marker([lat, lng], { icon: iconoBasural, draggable: true }).addTo(map);
        },
        function(err) {
            alert("Error obteniendo ubicación: " + err.message);
        },
        { enableHighAccuracy: true }
    );
});

// ===============================
// LEER FOTO COMO BASE64
// ===============================
document.getElementById("fotoArchivo").addEventListener("change", function(e) {

    let archivo = e.target.files[0];
    if (!archivo) return;

    let lector = new FileReader();

    lector.onload = function(evt) {
        fotoBase64 = evt.target.result;
        console.log("FOTO BASE64:", fotoBase64);
    };

    lector.readAsDataURL(archivo);
});

// ===============================
// GUARDAR REPORTE (Solo consola)
// ===============================
document.getElementById("guardar").addEventListener("click", function() {

    let data = {
        latitud: document.getElementById("lat").value,
        longitud: document.getElementById("lng").value,
        tipo: document.getElementById("tipo").value,
        volumen: document.getElementById("volumen").value,
        peligro: document.getElementById("peligro").value,
        descripcion: document.getElementById("descripcion").value,
        foto_url: document.getElementById("foto").value,
        foto_archivo: fotoBase64,
        fecha: document.getElementById("fecha").value
    };

    console.log("REPORTE:", data);

    document.getElementById("mensaje").innerHTML = 
        "Reporte generado correctamente. (Revisar consola)";
});
=======
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
>>>>>>> 9a7ce9a7f5df3da53c7e9a3a14bc62d80c4b989b
