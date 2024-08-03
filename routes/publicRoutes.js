import fp from "fastify-plugin";
import healthcheck from 'fastify-healthcheck';
import Static from '@fastify/static'
import path from 'path';
import { dirname} from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function publicRoutes (fastify, opts) {
// Register healthcheck plugin 
fastify.register(healthcheck, {
  healthcheckUrl: '/health',
  // healthcheckUrlDisable: true,
  // healthcheckUrlAlwaysFail: true,
  // underPressureOptions: { } // no under-pressure specific options set here
  exposeUptime: true // enable, as a sample
})

await fastify.register(Static, {
  root: path.join(__dirname, '..', 'static'),
  prefix: '/' ,
  wildcard: false,
}) 


fastify.get("/data", async function(request, reply) {
    let matches = Object.values(fastify.data.jsonData).filter(company => {
        const regex = new RegExp(`^${request.query.input}`,'gi');
        return company.Symbol.match(regex) || company.Security.match(regex)
    });
    
    return reply.send(matches)
})

fastify.get("/*", async function(request, reply) {
    return reply.redirect('index.html',303)
})

}

export default fp(publicRoutes, {
    // Protip: if you name your plugins, the stack trace in case of errors
    //         will be easier to read and other plugins can declare their dependency
    //         on this one. `fastify-autoload` will take care of loading the plugins
    //         in the correct order.
    name: 'publicRoutes'
})
