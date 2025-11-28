# trabajo-practico-integrador-2

# Sistema de Gestión de Blog Personal con MongoDB

Proyecto correspondiente al Trabajo Práctico Integrador II: desarrollo de una API REST para gestionar un blog personal usando Node.js, Express, MongoDB y Mongoose.  
Incluye autenticación con JWT, cookies httpOnly, validaciones con express-validator y relaciones entre usuarios, artículos, etiquetas (tags) y comentarios.

---

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens (jsonwebtoken)
- bcryptjs
- express-validator
- cookie-parser
- cors
- morgan
- dotenv

---

## Estructura del proyecto

```text
src/
  config/
    database.js
  controllers/
    auth.controller.js
    users.controller.js
    articles.controller.js
    tags.controller.js
    comments.controller.js
  helpers/
    jwt.helper.js
    bcrypt.helper.js
  middlewares/
    auth.middleware.js
    admin.middleware.js
    validator.js
    validations/
      auth.validations.js
      tag.validations.js
  models/
    user.model.js
    articles.model.js
    tag.model.js
    comment.model.js
  routes/
    index.js
    auth.routes.js
    user.routes.js
    articles.routes.js
    tags.routes.js
    comments.routes.js
app.js
