import Fastify from 'fastify';
import userRoutes from './modules/user/user.route';

const server = Fastify();

server.get('/healthcheck', async (req, res) => {
  return { status: 'OK' };
});

async function main() {
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
