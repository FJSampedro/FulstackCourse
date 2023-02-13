const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

// El código comienza buscando al usuario en la base de datos por el nombre de usuario adjunto a la solicitud.
// A continuación, verifica la contraseña, también adjunta a la solicitud. Debido a que las contraseñas en sí 
// no se guardan en la base de datos, sino hash calculadas a partir de las contraseñas, 
// el método bcrypt.compare se usa para verificar si la contraseña es correcta:

// Si no se encuentra el usuario o la contraseña es incorrecta, se responde a la solicitud 
// con el código de estado 401 unauthorized. El motivo del error se explica en el cuerpo de respuesta.

// Si la contraseña es correcta, se crea un token con el método jwt.sign. 
// El token contiene el nombre de usuario y la identificación de usuario en un formulario firmado digitalmente.

// El token ha sido firmado digitalmente usando una cadena de variable de entorno SECRET como secreto. 
// La firma digital garantiza que solo las partes que conocen el secreto puedan generar un token válido. 
// El valor de la variable de entorno debe establecerse en el archivo .env.

// Una solicitud exitosa se responde con el código de estado 200 OK. 
// El token generado y el nombre de usuario del usuario se devuelven al cuerpo de la respuesta.

loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter