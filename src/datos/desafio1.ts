import { Users } from 'lucide-react';
import type { Desafio, Opcion, Pregunta } from '@/tipos/juego';

const CATEGORIAS_ATRIBUTO: Opcion[] = [
  { id: 'simple', texto: 'Simple' },
  { id: 'compuesto', texto: 'Compuesto' },
  { id: 'multivalor', texto: 'Multivalor' },
  { id: 'derivado', texto: 'Derivado' },
];

const explicacionClasificacion =
  'Simple: un solo valor. Compuesto: se forma con partes. Multivalor: puede tener varios valores. Derivado: se calcula a partir de otro dato.';

const preguntaEntidades: Pregunta = {
  id: 'd1-entidades',
  tipo: 'seleccion-multiple',
  enunciado: 'Selecciona todas las entidades que aparecen en el caso.',
  opciones: [
    { id: 'cliente', texto: 'Cliente' },
    { id: 'mascota', texto: 'Mascota' },
    { id: 'estancia', texto: 'Estancia' },
    { id: 'servicio', texto: 'Servicio' },
    { id: 'telefono', texto: 'Teléfono' },
    { id: 'domicilio', texto: 'Domicilio' },
    { id: 'edad', texto: 'Edad' },
    { id: 'numero-espacio', texto: 'Número de espacio' },
  ],
  correctas: ['cliente', 'mascota', 'estancia', 'servicio'],
  explicacionesOpciones: {
    cliente: 'Cliente tiene datos propios y se relaciona con las mascotas, así que es una entidad.',
    mascota: 'Mascota tiene sus propios datos y se hospeda en estancias, así que es una entidad.',
    estancia: 'Estancia es un hecho con fechas y espacio que se registra por separado, así que es una entidad.',
    servicio: 'Servicio tiene nombre y precio y se contrata en varias estancias, así que es una entidad.',
    telefono: 'El teléfono es un atributo del Cliente. Como un cliente puede tener varios, es multivalor, no una entidad.',
    domicilio: 'El domicilio es un atributo compuesto del Cliente, formado por calle, número y colonia.',
    edad: 'La edad es un atributo derivado de Mascota: se calcula con la fecha de nacimiento.',
    'numero-espacio': 'El número de espacio es un atributo de Estancia, no una entidad aparte.',
  },
  explicacion:
    'Una entidad es algo de lo que queremos guardar datos propios. Teléfono, domicilio, edad y número de espacio describen a otras entidades.',
};

const clasificarCliente: Pregunta = {
  id: 'd1-atributos-cliente',
  tipo: 'clasificacion',
  enunciado: 'Clasifica los atributos de Cliente.',
  categorias: CATEGORIAS_ATRIBUTO,
  elementos: [
    { id: 'nombre', texto: 'nombre', correcta: 'simple', explicacion: 'El nombre es un solo valor que no se divide en partes.' },
    { id: 'telefonos', texto: 'teléfonos', correcta: 'multivalor', explicacion: 'Un cliente puede tener varios teléfonos, así que el atributo guarda varios valores.' },
    { id: 'domicilio', texto: 'domicilio', correcta: 'compuesto', explicacion: 'El domicilio se forma con calle, número y colonia, que son sus partes.' },
  ],
  explicacion: explicacionClasificacion,
};

const clasificarMascota: Pregunta = {
  id: 'd1-atributos-mascota',
  tipo: 'clasificacion',
  enunciado: 'Clasifica los atributos de Mascota.',
  categorias: CATEGORIAS_ATRIBUTO,
  elementos: [
    { id: 'nombre', texto: 'nombre', correcta: 'simple', explicacion: 'El nombre de la mascota es un solo valor.' },
    { id: 'especie', texto: 'especie', correcta: 'simple', explicacion: 'La especie es un solo valor: perro o gato.' },
    { id: 'fecha-nacimiento', texto: 'fecha de nacimiento', correcta: 'simple', explicacion: 'La fecha es un solo valor que se guarda tal cual.' },
    { id: 'peso', texto: 'peso', correcta: 'simple', explicacion: 'El peso es un solo valor numérico.' },
    { id: 'edad', texto: 'edad', correcta: 'derivado', explicacion: 'La edad se calcula con la fecha de nacimiento, por eso es derivada.' },
  ],
  explicacion: explicacionClasificacion,
};

const clasificarEstanciaServicio: Pregunta = {
  id: 'd1-atributos-estancia-servicio',
  tipo: 'clasificacion',
  enunciado: 'Clasifica los atributos de Estancia y de Servicio.',
  categorias: CATEGORIAS_ATRIBUTO,
  elementos: [
    { id: 'fecha-entrada', texto: 'fecha de entrada (Estancia)', correcta: 'simple', explicacion: 'Es una sola fecha registrada al entrar.' },
    { id: 'fecha-salida', texto: 'fecha de salida (Estancia)', correcta: 'simple', explicacion: 'Es una sola fecha registrada al salir.' },
    { id: 'numero-espacio', texto: 'número de espacio (Estancia)', correcta: 'simple', explicacion: 'Es un solo número que identifica el espacio.' },
    { id: 'nombre-servicio', texto: 'nombre (Servicio)', correcta: 'simple', explicacion: 'El nombre del servicio es un solo valor.' },
    { id: 'precio-servicio', texto: 'precio (Servicio)', correcta: 'simple', explicacion: 'El precio de lista del servicio es un solo valor.' },
  ],
  explicacion: explicacionClasificacion,
};

const preguntas: Pregunta[] = [preguntaEntidades, clasificarCliente, clasificarMascota, clasificarEstanciaServicio];

export const DESAFIO_1: Desafio = {
  id: 1,
  titulo: 'Identifica las entidades y atributos',
  subtitulo: 'Descubre qué guardar y cómo describir cada dato',
  icono: Users,
  instrucciones:
    'Lee el caso del Hotel Patitas. Primero selecciona las entidades. Después clasifica los atributos de cada una como simple, compuesto, multivalor o derivado.',
  preguntas,
};
