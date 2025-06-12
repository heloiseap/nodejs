import { app } from "./app"
import { env } from './env'

app
  .listen({
    port: env.PORT,
    host: ("RENDER" in process.env) ? '0.0.0.0' : 'localhost'
  })
  .then(() => {
    console.log('http server running!!! !')
  })
// to run npm install -D @types/node, npm install tsx -D, npx tsx src/server.ts para desenvolvimento! p prod converter em js e executar
// install -D @types/node, npx tsc src/server.ts (transforma em js), 