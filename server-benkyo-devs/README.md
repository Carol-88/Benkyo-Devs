# API para estudiantes de aplicación

Consiste en un juego en el que se presentan tarjetas
por nivel y lenguaje de programación que contienen preguntas
con una respuesta correcta y otra incorrecta.

## Entidades

- User:
  - id
  - name
  - avatar
  - email
  - password

- Language:
  - id
  - name

- Level:
  - id
  - name (fácil, medio, difícil)

- Card:
  - id
  - question
  - answer
  - true_answer
  - false_anwser
  
- Deck:
  - id
  - name

- User_Card
  - id
  - is_correct
  - is_favourite

- User_Card_Deck 
  -id
  

## Endpoints

- **POST /user**  Registro de usuario ✅
- **GET /user/:id** Devuelve información de usuario ✅
- **PUT /user/edit** Modifica el nombre y el email de un usuario autentificado ✅
- **PUT /user/password** Modifica la contraseña de un usuario
- **DELETE /user/delete** Elimina usuario 
- **POST /login**  Login de usuario (devuelve token) ✅
- **GET /mysql/:id**  Devuelve la tarjeta por id (questions.json)✅
- **GET /card/:id**  Devuelve la tarjeta por id (questions.json)✅
- **GET /user/card/:id**  Devuelve todas las tarjetas relacionadas con el usuario 
- **Get /user/card/level** Devuelve todas las tarjetas de un mismo nivel
- **POST /deck**  Registra mazo de usuario 
- **GET /deck/:id**  Devuelve mazo de usuario por id

## Instalación

- Clonar el repositorio

- Instalar dependencias

  npm install

- Configurar variables de entorno

  cp .env.example .env

- Ejecutar migraciones

  npm run migrations:reset
 

## Añadir cards en tu MySQL

- Abre MySQL 

- Añade un query tab

- Inserta:

- create database benkyo

- use benkyo

- copia las tablas del archivo initDB.js

- copia el insertLanguage.sql

- copia insertLevel.sql

- copia insertCards.sql

- ejecuta toda la query 