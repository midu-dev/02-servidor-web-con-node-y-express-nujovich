const express = require('express')
const path = require('node:path')
const app = express()

const PORT = process.env.PORT ?? 1234

app.use((req, res, next) => {
  const { method, headers } = req
  if (method !== 'POST') {
    return next()
  }
  if (headers['content-type'] !== 'application/json') {
    return next()
  }

  let body = ''
  req.on('data', (chunk) => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    req.body = data
    next()
  })
})

app.use(express.static(path.join(__dirname, 'assets')))

app.get('/', (req, res) => {
  res.status(200).send('<h1>¡Hola mundo!</h1>')
})

app.all('/', (req, res) => {
  res.status(405).send('<h1>405</h1>')
})

app.get('/logo.webp', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'assets', 'logo.webp'))
})

app.all('/logo.webp', (req, res) => {
  res.status(405).send('<h1>405</h1>')
})

app.post('/contacto', (req, res) => {
  res.status(201).json(req.body)
})

app.all('/contacto', (req, res) => {
  res.status(405).send('<h1>405</h1>')
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
