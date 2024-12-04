import http from 'http'

const server = http.createServer((request, response) => {
    if (request.url === "/json") {
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
    } else {
        request.writeHead(404, { "Content-Type": "text/plain" })
    }
})

server.listen(8080, () => {
    console.log("Server began.")
})