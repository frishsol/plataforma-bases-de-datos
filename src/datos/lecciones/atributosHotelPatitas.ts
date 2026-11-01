import type { AtributoActividad } from '@/tipos/actividadAtributos';

export const ATRIBUTOS_HOTEL_PATITAS: AtributoActividad[] = [
  {
    id: 'id_mascota',
    nombre: 'id_mascota',
    entidad: 'Mascota',
    variante: 'clave',
    pista: '¿Este dato distingue a cada mascota de las demás sin repetirse?',
    explicacion: 'Identifica de forma única a cada mascota, por eso su nombre va subrayado.',
  },
  {
    id: 'nombre',
    nombre: 'nombre',
    entidad: 'Mascota',
    variante: 'simple',
    pista: '¿El dato se puede dividir, repetir o calcular? Si no, es sencillo.',
    explicacion: 'Es un dato indivisible con un solo valor por mascota: óvalo sencillo.',
  },
  {
    id: 'telefono',
    nombre: 'teléfono',
    entidad: 'Cliente',
    variante: 'multivalor',
    pista: '¿Un mismo cliente puede tener más de un teléfono registrado?',
    explicacion: 'Un cliente puede tener varios teléfonos, así que se dibuja con óvalo doble.',
  },
  {
    id: 'edad',
    nombre: 'edad',
    entidad: 'Mascota',
    variante: 'derivado',
    pista: '¿El valor puede calcularse a partir de otro dato, como la fecha de nacimiento?',
    explicacion: 'Se calcula con la fecha de nacimiento, así que no conviene guardarlo: óvalo discontinuo.',
  },
  {
    id: 'domicilio',
    nombre: 'domicilio',
    entidad: 'Cliente',
    variante: 'compuesto',
    partes: ['calle', 'número', 'colonia'],
    pista: '¿El dato se divide en partes que interesa guardar por separado?',
    explicacion: 'Se divide en calle, número y colonia, así que su óvalo se une a un óvalo por cada parte.',
  },
];
