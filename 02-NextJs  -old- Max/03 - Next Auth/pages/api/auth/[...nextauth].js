import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { connectToDatabase } from '../../../lib/db';
import { verifyPassword } from '../../../lib/auth';

export default NextAuth({
  session: { jwt: true },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDatabase();

        const userCollection = client.db().collection('user');

        const user = await userCollection.findOne({ email: credentials.email });

        if (!user) {
          client.close();
          throw new Error('Invalid email');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!user) {
          client.close();
          throw new Error('Invalid password');
        }

        client.close();

        return { email: user.email };
      },
    }),
  ],
});
