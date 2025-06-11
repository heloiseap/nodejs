import http from 'node:http' //package.json -> type="module"
//const http = require('http') package.json -> type="commonjs"
//node: pq vem do node
const server = http.createServer((req, res)=> {
    return res.end("hello world")
})
server.listen(3333)
//executar: node src/server.js ou node --watch src/server.js
//package.json    scripts: "dev": "node --watch src/server.js" para executar npm run dev
