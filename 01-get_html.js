import http from 'http'

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/html') {
        res.writeHead(200, { "Content-Type": "text/html" })
        const htmlContent = `
        <!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
      <h1>Any fool can write code that a computer can understand. Good programmers write code that humans can understand.</h1>
      <p> - Martin Fowler</p>

  </body>
</html>`
        res.end(htmlContent)
        console.log("Response sent.")
    } else {
        res.writeHead('404', { "Content-Type": "text/plain"})
    }
})

let port = 8080
server.listen(port, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:',port)
})
// http://127.0.0.1:8080/html

// server.listen(8080, () => {
//     console.log("Server started");
// }) 
// http://localhost:8080/html