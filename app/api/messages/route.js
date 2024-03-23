import connectDb from '@/config/db.config';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

export const GET = async () => {
  try {
    await connectDb();

    const userSession = await getSessionUser();

    if (!userSession || !userSession.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = userSession;

    const readMessages = await Message.find({ recipient: userId, read: true })
      .sort({ createdAt: -1 })
      .populate('sender', 'username')
      .populate('property', 'name');

    const unreadMessages = await Message.find({
      recipient: userId,
      read: false,
    })
      .sort({ createdAt: -1 })
      .populate('sender', 'username')
      .populate('property', 'name');

    const messages = [...unreadMessages, ...readMessages];

    return new Response(JSON.stringify({ messages }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Something went wrong' }), {
      status: 500,
    });
  }
};

export const POST = async (request) => {
  try {
    await connectDb();

    const userSession = await getSessionUser();

    if (!userSession || !userSession.userId) {
      return new Response(
        JSON.stringify({ message: 'You must be logged in to send a message' }),
        { status: 401 }
      );
    }

    const { user } = userSession;
    const { name, email, phoneNumber, message, property, recipient } =
      await request.json();

    if (user.id === recipient) {
      return new Response(
        JSON.stringify({ message: 'cannot send à message to yourself' }),
        { status: 400 }
      );
    }

    const newMessage = new Message({
      sender: user.id,
      recipient,
      property,
      body: message,
      phone: phoneNumber,
      email,
      name,
    });

    await newMessage.save();

    return new Response(JSON.stringify({ message: 'Message sent' }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Something went wrong' }), {
      status: 500,
    });
  }
};
