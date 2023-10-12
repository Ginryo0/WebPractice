import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import fjwt from 'fastify-jwt';
import swagger from 'fastify-swagger';
import { withRefResolver } from 'fastify-zod';
import userRoutes from './modules/user/user.route';
import productRoutes from './modules/product/product.route';
import { userSchemas } from './modules/user/user.schema';
import { productSchemas } from './modules/product/product.schema';
import { version } from '../package.json';

export const server = Fastify();

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: any;
  }
}

declare module 'fastify-jwt' {
  interface FastifyJWT {
    user: {
      id: number;
      email: string;
      name: string;
    };
  }
}

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
  for (const schema of [...userSchemas, ...productSchemas]) {
    server.addSchema(schema);
  }

  server.register(
    swagger,
    withRefResolver({
      routePrefix: '/docs',
      exposeRoute: true,
      staticCSP: true,
      openapi: {
        info: {
          title: 'Fastify API',
          description: 'Fastify API that manages products',
          version: version,
        },
      },
    })
  );

  server.register(userRoutes, { prefix: '/api/users' });
  server.register(productRoutes, { prefix: '/api/products' });

  try {
    await server.listen(3000, '0.0.0.0');
    console.log('Server ready');
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

main();
