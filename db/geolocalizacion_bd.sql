-- 1. CREACIÓN DE LA BASE DE DATOS (Solo para tu módulo)
DROP DATABASE IF EXISTS sistema_mensajeria_modulo;
CREATE DATABASE sistema_mensajeria_modulo;
USE sistema_mensajeria_modulo;

-- 2. TABLAS DE CATÁLOGO (Requeridas por 'usuarios')
CREATE TABLE genero (
    genero_id INT AUTO_INCREMENT PRIMARY KEY,
    genero_descripcion VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE estado_civil (
    estado_civil_id INT AUTO_INCREMENT PRIMARY KEY,
    estado_civil_descripcion VARCHAR(50) NOT NULL UNIQUE
);

-- 3. TABLA DE USUARIOS (Esencial para Emisor/Receptor)
CREATE TABLE usuarios (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_nombre VARCHAR(50) UNIQUE NOT NULL,
    usuario_primer_nombre VARCHAR(50) NOT NULL,
    usuario_segundo_nombre VARCHAR(50),
    usuario_apellido_paterno VARCHAR(50) NOT NULL,
    usuario_apellido_materno VARCHAR(50),
    usuario_edad INT,
    usuario_genero_id INT,
    usuario_estado_civil_id INT,
    usuario_email VARCHAR(100) UNIQUE NOT NULL,
    usuario_telefono VARCHAR(15),
    usuario_direccion_completa TEXT,
    usuario_contrasena_hash VARCHAR(255) NOT NULL,
    usuario_foto_perfil LONGBLOB,
    usuario_fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    usuario_ultima_conexion DATETIME,
    usuario_activo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (usuario_genero_id) REFERENCES genero(genero_id),
    FOREIGN KEY (usuario_estado_civil_id) REFERENCES estado_civil(estado_civil_id)
);

-- 4. TABLA DE MONITOREO (Dependencia de 'mensaje')
CREATE TABLE monitoreo (
    monitoreo_id INT AUTO_INCREMENT PRIMARY KEY,
    monitoreo_usuario_id INT NOT NULL, -- Usuario monitoreado
    monitoreo_administrador_id INT NOT NULL, -- Usuario administrador
    monitoreo_fecha_asignacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    monitoreo_activo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (monitoreo_usuario_id) REFERENCES usuarios(usuario_id) ON DELETE CASCADE,
    FOREIGN KEY (monitoreo_administrador_id) REFERENCES usuarios(usuario_id) ON DELETE CASCADE
);

-- 5. TABLAS DE MENSAJERÍA (Tu módulo principal)
CREATE TABLE mensaje_predeterminado (
    id_mensaje_pred INT AUTO_INCREMENT PRIMARY KEY,
    texto VARCHAR(255)
);

CREATE TABLE mensaje (
    id_mensaje INT AUTO_INCREMENT PRIMARY KEY,
    texto TEXT,
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mensaje_leido BOOLEAN NOT NULL DEFAULT 0, -- 0=No, 1=Sí
    
    -- Conexión opcional a mensajes predeterminados
    id_mensajes_pred INT NULL,
    
    -- Conexión opcional a la sesión de monitoreo
    id_monitoreo_usuarios INT NULL, 

    -- Conexiones esenciales (Emisor y Receptor)
    usuario_emisor_id INT NOT NULL, 
    usuario_receptor_id INT NOT NULL, 

    -- Definición de Claves Foráneas
    FOREIGN KEY (id_mensajes_pred) 
        REFERENCES mensaje_predeterminado(id_mensaje_pred),
        
    FOREIGN KEY (id_monitoreo_usuarios) 
        REFERENCES monitoreo(monitoreo_id),
        
    FOREIGN KEY (usuario_emisor_id) 
        REFERENCES usuarios(usuario_id) ON DELETE CASCADE,
        
    FOREIGN KEY (usuario_receptor_id) 
        REFERENCES usuarios(usuario_id) ON DELETE CASCADE
);