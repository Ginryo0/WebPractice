import { FastifyInstance } from 'fastify';
import { registerUserHandler } from './user.controller';
import { $ref } from './user.schema';
import { loginHandler } from './user.controller';
import { getUserHandler } from './user.controller';
async function userRoutes(server: FastifyInstance) {
  server.post(
    '/',
    {
      schema: {
        body: $ref('createUserSchema'),
        response: {
          201: $ref('createUserResponseSchema'),
        },
      },
    },
    registerUserHandler
  );

  server.post(
    '/login',
    {
      schema: {
        body: $ref('loginSchema'),
        response: {
          200: $ref('loginResponseSchema'),
        },
      },
    },
    loginHandler
  );

  server.get(
    '/',
    {
      preHandler: [server.authenticate],
    },
    getUserHandler
  );
}

export default userRoutes;
