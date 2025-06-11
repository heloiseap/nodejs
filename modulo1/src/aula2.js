import { read } from 'node:fs'
import http from 'node:http'

const users = []

const server = http.createServer((req, res)=> {
    const {method, url} = req
    // console.log(method, url)
    if (method === 'GET' && url === '/users') {
        // return res.end('Listagem de usuários')
        return res
            .setHeader('Content-type', 'application/json') //formato json lido melhor pelo terminal
            .end(JSON.stringify(users))
    } 

    if (method === 'POST' && url === '/users') {
        users.push({
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com'
        })
        // return res.end('Criação de usuários')
        return res.writeHead(201).end()
    } 
    // return res.end("hello world")
    return res.writeHead(404).end()
    
})
server.listen(3333)