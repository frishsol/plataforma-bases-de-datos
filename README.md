
# 🗃️ DataModel Lab

### Laboratorio interactivo para el diseño de bases de datos

**DataModel Lab** es una plataforma educativa web que permite aprender y practicar el diseño de bases de datos mediante explicaciones visuales, ejemplos guiados y actividades interactivas.

Su propósito es ayudar a los estudiantes a comprender cómo transformar un problema del mundo real en un modelo de datos estructurado, desde el análisis de necesidades hasta el diseño relacional y físico.

> **Aprende · Observa · Practica**

## 🎯 Objetivo

Facilitar el aprendizaje del diseño de bases de datos a través de una experiencia interactiva que combine fundamentos teóricos, ejemplos contextualizados y ejercicios con retroalimentación.

## 📚 Contenido de la plataforma

### Módulo 1. Diseño de bases de datos

Incluye los siguientes temas:

**1. Análisis del planteamiento**
- Identificación de necesidades de información.
- Reconocimiento de reglas de negocio.
- Diferenciación de información relevante e irrelevante.

**2. Modelo entidad-relación (E-R)**
- Fundamentos del modelo E-R.
- Entidades, atributos y relaciones.
- Tipos de atributos y cardinalidades.
- Simbología de Chen.
- Comparación de notaciones de modelado.

**3. Modelo relacional (lógico)**
- Fundamentos del modelo relacional.
- Relaciones, atributos, tuplas y dominios.
- Esquemas e instancias.
- Claves primarias, candidatas, foráneas y compuestas.
- Integridad de entidad y referencial.
- Transformación del modelo E-R al relacional.

**4. Modelo físico**
- Introducción al diseño físico para MySQL.
- Tipos de datos.
- Longitudes y precisión.
- Claves y restricciones.
- Construcción de tablas.

*Actualmente se encuentra desarrollada la introducción al modelo físico. Los demás subtemas están contemplados para futuras versiones.*

### Módulo 2. Normalización

Módulo planificado para enseñar el proceso de normalización de bases de datos hasta la tercera forma normal (3FN).

**Estado:** en desarrollo.

## 🧠 Metodología de aprendizaje

Cada lección se organiza en tres etapas:

| Etapa | Descripción |
|---|---|
| 📖 **Aprende** | Presenta conceptos, definiciones y ejemplos visuales. |
| 👁️ **Observa** | Explica procedimientos mediante ejemplos guiados paso a paso. |
| ✍️ **Practica** | Permite resolver ejercicios y recibir retroalimentación. |

La plataforma incorpora actividades de selección, clasificación, identificación de conceptos y exploración de tablas interactivas.

## 🐾 Caso práctico: Hotel Patitas

DataModel Lab utiliza como ejemplo transversal **Hotel Patitas**, un sistema de hospedaje temporal para perros y gatos.

A partir de este caso se estudian:

- Identificación de entidades y atributos.
- Relaciones y cardinalidades.
- Construcción de modelos entidad-relación.
- Transformación al modelo relacional.
- Identificación de claves primarias y foráneas.
- Aplicación de reglas de integridad referencial.

El uso de un mismo caso permite comprender cómo evoluciona el diseño de una base de datos a través de sus diferentes etapas.

## ✨ Características

- Navegación organizada por módulos, temas y lecciones.
- Explicaciones visuales y ejemplos progresivos.
- Diagramas de modelado de bases de datos.
- Tablas interactivas para explorar atributos, tuplas y claves.
- Actividades con pistas y retroalimentación.
- Indicadores de avance en ejemplos y ejercicios.
- Interfaz adaptable a diferentes tamaños de pantalla.

## 🛠️ Tecnologías utilizadas

| Tecnología | Función |
|---|---|
| React | Construcción de la interfaz de usuario. |
| TypeScript | Desarrollo de componentes y lógica de la aplicación. |
| Vite | Entorno de desarrollo y compilación. |
| Tailwind CSS | Diseño visual y estilos responsivos. |
| Lucide React | Iconografía de la interfaz. |
| GitHub | Control de versiones y almacenamiento del código. |
| GitHub Pages | Publicación de la aplicación web. |
| Bolt.new | Herramienta de apoyo para el desarrollo del prototipo. |

## 🚀 Instalación y ejecución local

### Requisitos

- Node.js
- npm
- Git

### Pasos

**1. Clonar el repositorio**

```bash
git clone https://github.com/frishso/plataforma-bases-de-datos.git
```

**2. Entrar a la carpeta del proyecto**

```bash
cd plataforma-bases-de-datos
```

**3. Instalar dependencias**

```bash
npm install
```

**4. Iniciar el servidor de desarrollo**

```bash
npm run dev
```

Abrir en el navegador la dirección local indicada por Vite.

## 🔗 Enlaces del proyecto

**Repositorio de GitHub:**

https://github.com/frishso/plataforma-bases-de-datos

**Versión web:**

https://frishso.github.io/plataforma-bases-de-datos/

## 📌 Estado del desarrollo

**Prototipo funcional en evolución.**

Actualmente se encuentran implementadas diversas lecciones del módulo de diseño de bases de datos, con ejemplos guiados y actividades interactivas.

### Próximas mejoras

- Ampliación de actividades para transformar modelos E-R en esquemas relacionales.
- Desarrollo de los subtemas pendientes del modelo físico.
- Incorporación del módulo de normalización hasta 3FN.
- Mejoras en el diseño visual y la experiencia de usuario.
- Nuevas actividades prácticas y mecanismos de seguimiento del aprendizaje.

## 🎓 Enfoque educativo

DataModel Lab está orientado a estudiantes universitarios que comienzan a estudiar el diseño de bases de datos.

Su enfoque combina explicaciones conceptuales, visualizaciones y actividades prácticas para fortalecer la comprensión y aplicación de los conocimientos.

La plataforma se encuentra en desarrollo y continuará evolucionando con nuevas lecciones y funcionalidades.

---

**DataModel Lab — Del problema a la base de datos.**

*Aprende, observa, practica y construye.*
