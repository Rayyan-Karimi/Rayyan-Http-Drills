import http from 'http'

const server = http.createServer((request, response) => {
    if (request.method === 'GET' && request.url === '/html') {
        response.writeHead(200, { "Content-Type": "text/html" })
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
        response.end(htmlContent)
        console.log("Response sent.")
    } else if (request.url === "/json") {
        response.writeHead(200, { "Content-Type": "application/json" })
        const jsonContent = `
        {
  "slideshow": {
    "author": "Yours Truly",
    "date": "date of publication",
    "slides": [
      {
        "title": "Wake up to WonderWidgets!",
        "type": "all"
      },
      {
        "items": [
          "Why <em>WonderWidgets</em> are great",
          "Who <em>buys</em> WonderWidgets"
        ],
        "title": "Overview",
        "type": "all"
      }
    ],
    "title": "Sample Slide Show"
  }
}`
        response.end(jsonContent)
        console.log("Response sent.")
    } else if (request.url === '/uuid') {
        response.writeHead(200, { "Content-Type": "application/json" })
        const result = {
            "uuid": "14d96bb1-5d53-472f-a96e-b3a1fa82addd"
        }
        response.end(JSON.stringify(result))
        console.log("Response sent successfully.")
    } else if (request.method === 'GET' && request.url.startsWith('/status')) {
        const array = request.url.split('/')
        const statusCode = parseInt(array[2], 10)
        if (isNaN(statusCode)) {
            response.writeHead(400, { "Content-Type": "text/html" })
            response.end(`<h1 style="color: lightblue">invalid status code. ${statusCode}</h1>`)
            console.log("Invalid status code received.");
            return;
        }

        if (statusCode >= 100 && statusCode < 200) {
            response.writeHead(200, { "Content-Type": "text/html" })
            response.end(`<h3 style="color: orange">Informational responses: ${statusCode}</h3>
                <h3> You tried to send an informational request.`)
        } else if (statusCode >= 200 && statusCode < 300) {
            response.writeHead(statusCode, { "Content-Type": "text/html" })
            response.end(`<h1 style="color: green">Success responses: ${statusCode}</h1>`)
        } else if (statusCode >= 300 && statusCode < 400) {
            response.writeHead(statusCode, {
                "Content-Type": "text/plain",
                "Location": "/status/400" //redirect to any url
            })
            console.log("Status code 300:", statusCode)
            response.end(`<h1 style="color: purple">Redirectional response: ${statusCode}</h1>`)
        } else if (statusCode >= 400 && statusCode < 500) {
            response.writeHead(statusCode, { "Content-Type": "text/html" })
            response.end(`<h1 style="color: red">Client error responses. ${statusCode}</h1>`)
        } else if (statusCode >= 500 && statusCode < 600) {
            response.writeHead(statusCode, { "Content-Type": "text/html" })
            response.end(`<h1 style="color: maroon">Server error responses. ${statusCode}</h1>`)
        } else {
            response.writeHead(statusCode, { "Content-Type": "text/html" })
            response.end(`<h1 style="color: orange">Status code not supported. ${statusCode}</h1>`)
        }
    } else if (request.method === 'GET' && request.url.startsWith('/delay')) {
        //  send PORT/<time-delay>
        const timeDelay = request.url.split('/')[2]
        if (isNaN(timeDelay)) {
            response.writeHead(400, { "Content-Type": "text/html" })
            response.end(`<h1 style="color: red">invalid Delay Time: <span style="color: orange">${timeDelay}</span></h1>`)
            console.log("Invalid time-delay received.");
            return;
        } else {
            setTimeout(() => {
                response.writeHead(200, { "Content-Type": "text/html" })
                response.end(`<h1 style="color: green">Successful delay in message.</h1><h2 style="color: orange">${timeDelay} seconds</h2>`)
            }, timeDelay * 1000)
        }
    } else {
        response.writeHead(404, { "Content-Type": "text/plain" })
        response.end("Not a correct request.")
    }
})

const port = 8080
const host = "127.0.0.1"
server.listen(port, host, () => console.log("Server started."))