import { createServer } from 'http'

const server = createServer((request, response) => {
    if (request.url === '/myUuid') {
        response.writeHead(200, { "Content-Type": "application/json" })
        const result = {
            "uuid": "14d96bb1-5d53-472f-a96e-b3a1fa82addd"
        }
        response.end(JSON.stringify(result))
        console.log("Response sent successfully.")
    } else {
        response.writeHead(404, "Custom internal server error")
    }
})
server.listen(8080, () => {
    console.log("Server started.")
})