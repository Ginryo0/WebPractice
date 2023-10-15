import { getSession } from 'next-auth/client';

import { hashPassword, verifyPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return;
  }

  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  const email = session.user.email;
  const oldPw = req.body.oldPassword;
  const newPw = req.body.newPassword;

  const client = await connectToDatabase();

  const usersCollection = client.db().collection('user');

  const user = await usersCollection.findOne({ email });

  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    client.close();
    return;
  }

  const passwordsAreEqual = await verifyPassword(oldPw, user.password);

  if (!passwordsAreEqual) {
    res.status(403).json({ message: 'Invalid password.' });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPw);

  const res = await usersCollection.updateOne(
    { email },
    { $set: { password: hashedPassword } }
  );

  client.close();
  res.status(200).json({ message: 'Password updated!' });
}
export default handler;
