import { FastifyInstance } from 'fastify';
import { createProuctHandler } from './product.controller';
import { getProductsHandler } from './product.controller';
import { $ref } from './product.schema';

async function productRoutes(server: FastifyInstance) {
  server.post(
    '/',
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref('createProductSchema'),
        response: {
          201: $ref('productResponseSchema'),
        },
      },
    },
    createProuctHandler
  );

  server.get(
    '/',
    {
      schema: {
        response: {
          200: $ref('productsResponseSchema'),
        },
      },
    },
    getProductsHandler
  );
}

export default productRoutes;
