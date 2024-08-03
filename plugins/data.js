import fp from "fastify-plugin";
import { promises as fs } from 'fs';
import path from 'path';

async function loadJsonData() {
  const filePath = path.resolve('static/data.json');
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
}

async function data(fastify){
fastify.decorate('data', { jsonData: await loadJsonData() });
}

export default fp(data, {
    // Protip: if you name your plugins, the stack trace in case of errors
    //         will be easier to read and other plugins can declare their dependency
    //         on this one. `fastify-autoload` will take care of loading the plugins
    //         in the correct order.
    name: 'data'
  })
