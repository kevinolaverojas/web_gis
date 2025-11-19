import mysql.connector
from mysql.connector import Error

try:
    # 1. Conectar al servidor MySQL (XAMPP)
    conexion = mysql.connector.connect(
        host="localhost",
        user="root",
        password=""       # En XAMPP normalmente NO lleva contraseña
    )

    if conexion.is_connected():
        print("Conexión exitosa a MySQL")

        cursor = conexion.cursor()

        # 2. Crear la base de datos
        cursor.execute("CREATE DATABASE IF NOT EXISTS webgis_basurales;")
        print("Base de datos 'webgis_basurales' creada o ya existente.")

        # 3. Seleccionar la base de datos
        cursor.execute("USE webgis_basurales;")

        # 4. Crear la tabla reportes
        tabla = """
        CREATE TABLE IF NOT EXISTS reportes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            lat DECIMAL(10,6),
            lon DECIMAL(10,6),
            tipo_basural VARCHAR(255),
            volumen FLOAT,
            peligro VARCHAR(50),
            descripcion TEXT,
            foto VARCHAR(255),
            fecha DATETIME,
            creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """

        cursor.execute(tabla)
        print("Tabla 'reportes' creada correctamente.")

except Error as e:
    print("Error al conectar o crear la base de datos:", e)

finally:
    if conexion.is_connected():
        cursor.close()
        conexion.close()
        print("Conexión cerrada.")
