import { Schema, model, Types } from "mongoose";

interface IMessages {
  recipient: Types.ObjectId;
  sender: Types.ObjectId;
  message: string;
  date: Date;
}

const MessagesSchema = new Schema<IMessages>({
  recipient: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Messages = model<IMessages>("Messages", MessagesSchema);

export { Messages };
export type { IMessages };