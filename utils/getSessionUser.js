import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth/next';

export const getSessionUser = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return null;
    }

    return {
      userId: session.user.id,
      user: session.user,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};
