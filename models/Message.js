import mongoose from 'mongoose';

const { Schema, models, model } = mongoose;

const MessageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      require: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    phone: {
      type: String,
    },
    body: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Message = models.Message || model('Message', MessageSchema);

export default Message;
