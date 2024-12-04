import http from 'http'

const server = http.createServer((request, response) => {
    if (request.method !== "GET") {
        response.writeHead(404, { "Content-Type": "text/plain" })
        response.end("Not a GET request.")
    } else {
        //  send PORT/<time-delay>
        const timeDelay = request.url.split('/')[1]
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
    }
})

const port = 8080
const host = "127.0.0.1"
server.listen(port, host, () => console.log("Server started."))