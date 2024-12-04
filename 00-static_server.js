// server.mjs
import { createServer } from 'node:http';

const server = createServer((req,res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain'})
    res.end('Hello World.')
})

let port = 8080
server.listen(port, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:',port)
})

// run with `node 00-....js`
