import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './ultils/extract-query-params.js'


const server = http.createServer(async (req, res)=> {
    const {method, url} = req

    await json(req,res)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)//route.path === url
    })

    if (route) {
        const routeParams = req.url.match(route.path)

        // console.log(routeParams.groups)
        // console.log(extractQueryParams(routeParams.groups.query))
        
        const { query, ...params} = routeParams.groups

        req.params = params
        req.query = query? extractQueryParams(query) : {}

        // req.params = {...routeParams.groups}
        
        // console.log(routeParams)
        return route.handler(req,res)
    }
    return res.writeHead(404).end()
    
})
server.listen(3333)