import { createServer } from 'http'

const server = createServer((request, response) => {
    if (request.method === 'GET') {
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
    } else {
        response.writeHead(404, { "Content-Type": "text/html" })
        response.end("<h1>404</h1><h3>Not found - this is not a <strong>GET</strong> request.</h1>")
    }
})


server.listen(8080, () => {
    console.log("Server started.")
})