import { Network, Sparkles } from 'lucide-react';
import type { Modulo } from '@/tipos/modulo';
import { DESAFIO_1 } from '@/datos/desafio1';
import { DESAFIO_2 } from '@/datos/desafio2';
import { DESAFIO_3 } from '@/datos/desafio3';
import { DESAFIO_4 } from '@/datos/desafio4';
import { LECCION_ANALISIS_PLANTEAMIENTO } from '@/datos/lecciones/analisisPlanteamiento';
import { LECCION_MODELO_FISICO_INTRO } from '@/datos/lecciones/modeloFisicoIntro';
import { LECCION_SIMBOLOGIA_CHEN } from '@/datos/lecciones/simbologiaChen';
import { LECCION_MODELO_RELACIONAL } from '@/datos/lecciones/modeloRelacional';

export const MODULOS: Modulo[] = [
  {
    id: 'diseno',
    numero: 1,
    titulo: 'Diseño de bases de datos',
    descripcion: 'Del texto de un planteamiento al modelo físico para MySQL, paso a paso.',
    icono: Network,
    temas: [
      {
        titulo: 'Análisis del planteamiento',
        descripcion:
          'Aprende a interpretar las necesidades de información y las reglas de negocio antes de comenzar el diseño de una base de datos.',
        leccion: LECCION_ANALISIS_PLANTEAMIENTO,
      },
      {
        titulo: 'Modelo entidad-relación (conceptual)',
        descripcion: 'Dibuja el diagrama E-R con notación de Chen: entidades, atributos, relaciones y cardinalidades.',
        leccion: LECCION_SIMBOLOGIA_CHEN,
      },
      {
        titulo: 'Modelo relacional (lógico)',
        descripcion: 'Transforma el diagrama E-R en tablas, con claves primarias, claves foráneas y tablas intermedias.',
        leccion: LECCION_MODELO_RELACIONAL,
      },
      {
        titulo: 'Modelo físico: preparando la base de datos para MySQL',
        descripcion: 'Convierte el modelo relacional en una especificación que MySQL puede implementar.',
        subtemas: [
          { titulo: '¿Qué es el modelo físico?', leccion: LECCION_MODELO_FISICO_INTRO },
          { titulo: 'Tipos de datos' },
          { titulo: 'Longitudes y precisión' },
          { titulo: 'Claves y restricciones' },
          { titulo: 'Construcción de una tabla física' },
          { titulo: 'Práctica de diseño físico' },
        ],
      },
      {
        titulo: 'Desafío integral: Hotel Patitas',
        descripcion: 'Aplica todo el proceso, desde el planteamiento hasta el modelo físico.',
      },
    ],
    desafios: [DESAFIO_1, DESAFIO_2, DESAFIO_3],
  },
  {
    id: 'normalizacion',
    numero: 2,
    titulo: 'Normalización',
    descripcion: 'Detecta redundancias y reorganiza tablas hasta la tercera forma normal.',
    icono: Sparkles,
    temas: [
      { titulo: 'Qué es la normalización y para qué sirve' },
      { titulo: 'Anomalías de inserción, actualización y eliminación' },
      { titulo: 'Dependencias funcionales y claves' },
      { titulo: 'Primera forma normal (1FN)' },
      { titulo: 'Segunda forma normal (2FN)' },
      { titulo: 'Tercera forma normal (3FN)' },
      { titulo: 'Ejercicio integral de normalización' },
    ],
    desafios: [DESAFIO_4],
  },
];
