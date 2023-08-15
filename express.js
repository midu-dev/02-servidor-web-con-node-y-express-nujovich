const express = require('express')
const path = require('node:path')
const app = express()

const PORT = process.env.PORT || 1234

startServer()

app.get('/', (req, res) => {
  res.status(200).send('<h1>¡Hola mundo!</h1>')
})

app.get('/logo.webp', (req, res) => {
  const pathImg = path.join(__dirname, '/assets/logo.webp')
  res.status(200).sendFile(pathImg)
})

app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

// Ejercicio 2: crear servidor HTTP con Express
function startServer () {
  const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
  return server
}

module.exports = {
  startServer
}
