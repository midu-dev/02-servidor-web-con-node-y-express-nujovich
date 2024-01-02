const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
  const { url, method } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/':
          res.writeHead(200, { 'Content-Type': 'text/html, charset=utf-8' })
          return res.end('<h1>¡Hola mundo!</h1>')
        case '/logo.webp':
          return fs.readFile('./assets/logo.webp', (err, data) => {
            if (err) {
              res.writeHead(500, { 'Content-Type': 'text/html, charset=utf-8' })
              return res.end('<h1>500</h1>')
            } else {
              res.writeHead(200, { 'Content-Type': 'image/webp' })
              return res.end(data)
            }
          })
        default:
          res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
          return res.end('<h1>404</h1>')
      }
    case 'POST':
      switch (url) {
        case '/contacto': {
          let body = ''
          req.on('data', (chunk) => {
            body += chunk.toString()
          })

          req.on('end', () => {
            const { name, email, message } = JSON.parse(body)
            res.writeHead(201, { 'Content-Type': 'application/json' })
            return res.end(
              JSON.stringify({
                name,
                email,
                message
              })
            )
          })
          break
        }
        default:
          res.writeHead(405, { 'Content-Type': 'text/html; charset=utf-8' })
          return res.end('<h1>405</h1>')
      }
      break
    default:
      res.writeHead(405, { 'Content-Type': 'text/html; charset=utf-8' })
      return res.end('<h1>405</h1>')
  }
}

// Ejercicio 1: crear servidor HTTP con Node
function startServer () {
  // return server
  const server = http.createServer(processRequest)
  server.listen(desiredPort, () => {
    console.log(`Server running at http://localhost:${desiredPort}/`)
  })

  return server
}

module.exports = {
  startServer
}
