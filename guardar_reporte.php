<?php
echo "PHP FUNCIONA";
exit;
// 1. DATOS DE CONEXIÓN A MYSQL (XAMPP)
$host = "localhost";
$user = "root";
$pass = "";
$db   = "webgis_basurales";

// 2. CONECTAR A MYSQL
$conexion = new mysqli($host, $user, $pass, $db);

// Ver si hubo error
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// 3. RECIBIR DATOS DEL FORMULARIO (POST)
$lat         = $_POST['lat'] ?? null;
$lon         = $_POST['lon'] ?? null;
$tipo        = $_POST['tipo'] ?? null;
$volumen     = $_POST['volumen'] ?? null;
$peligro     = $_POST['peligro'] ?? null;
$descripcion = $_POST['descripcion'] ?? null;
$fecha       = $_POST['fecha'] ?? null;

// 4. MANEJAR LA FOTO (SI VIENE)
$foto = "";
if (!empty($_FILES['foto']['name'])) {
    $carpeta = "uploads/";

    // Crear carpeta si no existe
    if (!file_exists($carpeta)) {
        mkdir($carpeta, 0777, true);
    }

    $nombreArchivo = basename($_FILES["foto"]["name"]);
    $rutaDestino   = $carpeta . $nombreArchivo;

    if (move_uploaded_file($_FILES["foto"]["tmp_name"], $rutaDestino)) {
        $foto = $rutaDestino;
    }
}

// 5. INSERTAR EN LA TABLA "reportes"
$sql = "INSERT INTO reportes (lat, lon, tipo_basural, volumen, peligro, descripcion, foto, fecha)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("ddsdssss", $lat, $lon, $tipo, $volumen, $peligro, $descripcion, $foto, $fecha);

if ($stmt->execute()) {
    echo "OK";
} else {
    echo "Error al guardar: " . $stmt->error;
}

// 6. CERRAR CONEXIÓN
$stmt->close();
$conexion->close();
?>