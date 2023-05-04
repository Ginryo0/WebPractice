import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import fjwt from 'fastify-jwt';
import userRoutes from './modules/user/user.route';
import { userSchemas } from './modules/user/user.schema';

export const server = Fastify();

server.register(fjwt, {
  secret: 'fsagjdghnftweqirj1243tnmrvbn313',
});

server.decorate(
  'authenticate',
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (e) {
      return reply.send(e);
    }
  }
);

server.get('/healthcheck', async (req, res) => {
  return { status: 'OK' };
});

async function main() {
  for (const schema of userSchemas) {
    server.addSchema(schema);
  }

  server.register(userRoutes, { prefix: '/api/users' });

  try {
    await server.listen(3000, '0.0.0.0');
    console.log('Server ready');
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

main();
