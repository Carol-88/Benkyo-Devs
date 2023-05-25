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
- **POST /login**  Login de usuario (devuelve token) ✅
- **GET /mysql/:id**  Devuelve la tarjeta por id (questions.json)✅
- **GET /card/:id**  Devuelve la tarjeta por id (questions.json)✅
- **GET /user/card/:id**  Devuelve todas las tarjetas relacionadas con el usuario 
- **POST /deck**  Registra mazo de usuario 
- **GET /deck/id**  Devuelve mazo de usuario por id

## Instalación

- Clonar el repositorio

- Instalar dependencias

```bash
npm install
```

- Configurar variables de entorno

```bash
cp .env.example .env
```

- Ejecutar migraciones

```bash
npm run migrations:reset
```