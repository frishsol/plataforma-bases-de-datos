import type { TablaEjemplo } from '@/tipos/leccion';

const FILAS_MASCOTA = [
  ['1', '10', 'Luna', 'Gato', '2022-03-14', '4.2'],
  ['2', '10', 'Max', 'Perro', '2020-07-01', '18.5'],
  ['3', '11', 'Nube', 'Gato', '2023-01-20', '3.8'],
];

export const TABLA_CLIENTE: TablaEjemplo = {
  nombre: 'Cliente',
  columnas: ['id_cliente (PK)', 'nombre', 'domicilio_calle', 'domicilio_numero', 'domicilio_colonia'],
  filas: [
    ['10', 'Ana Ruiz', 'Av. Juárez', '25', 'Centro'],
    ['11', 'Luis Pérez', 'Calle 5', '8', 'Jardines'],
  ],
};

export const TABLA_MASCOTA: TablaEjemplo = {
  nombre: 'Mascota',
  columnas: ['id_mascota (PK)', 'id_cliente (FK)', 'nombre', 'especie', 'fecha_nacimiento', 'peso'],
  filas: FILAS_MASCOTA,
};

export const TABLA_MASCOTA_FISICA: TablaEjemplo = {
  nombre: 'Mascota',
  columnas: [
    'id_mascota INT (PK)',
    'id_cliente INT (FK)',
    'nombre VARCHAR(50)',
    'especie VARCHAR(30)',
    'fecha_nacimiento DATE',
    'peso DECIMAL(5,2)',
  ],
  filas: FILAS_MASCOTA,
};

export const TABLA_ESTANCIA: TablaEjemplo = {
  nombre: 'Estancia',
  columnas: ['id_estancia (PK)', 'id_mascota (FK)', 'fecha_entrada', 'fecha_salida', 'numero_espacio'],
  filas: [
    ['101', '1', '2026-10-01', '2026-10-05', 'A3'],
    ['102', '3', '2026-10-12', '2026-10-14', 'B1'],
  ],
};

export const TABLA_SERVICIO: TablaEjemplo = {
  nombre: 'Servicio',
  columnas: ['id_servicio (PK)', 'nombre', 'precio'],
  filas: [
    ['1', 'Baño', '250.00'],
    ['2', 'Paseo', '120.00'],
  ],
};

export const TABLA_ESTANCIA_SERVICIO: TablaEjemplo = {
  nombre: 'EstanciaServicio',
  columnas: ['id_estancia (PK, FK)', 'id_servicio (PK, FK)', 'precio_cobrado'],
  filas: [
    ['101', '1', '250.00'],
    ['101', '2', '120.00'],
    ['102', '2', '120.00'],
  ],
};

export const TABLA_TELEFONO_CLIENTE: TablaEjemplo = {
  nombre: 'ClienteTelefono',
  columnas: ['id_cliente (PK, FK)', 'telefono (PK)'],
  filas: [
    ['10', '555-0101'],
    ['10', '555-0202'],
    ['11', '555-0303'],
  ],
};

export const TABLA_EMPLEADO_COMPLEMENTARIO: TablaEjemplo = {
  nombre: 'Empleado (ejemplo complementario)',
  columnas: ['id_empleado (PK)', 'nombre', 'id_supervisor (FK opcional)'],
  filas: [
    ['1', 'Rosa Vega', 'NULL'],
    ['2', 'Hugo Ramos', '1'],
    ['3', 'Iván Soto', '1'],
  ],
};

export const TABLA_PERSONA_COMPLEMENTARIO: TablaEjemplo = {
  nombre: 'Persona (ejemplo complementario)',
  columnas: ['id_persona (PK)', 'nombre'],
  filas: [
    ['1', 'Rosa Vega'],
    ['2', 'Hugo Ramos'],
  ],
};

export const TABLA_PASAPORTE_COMPLEMENTARIO: TablaEjemplo = {
  nombre: 'Pasaporte (ejemplo complementario)',
  columnas: ['numero (PK)', 'id_persona (FK, UNIQUE)'],
  filas: [
    ['MX-1001', '1'],
    ['MX-1002', '2'],
  ],
};
