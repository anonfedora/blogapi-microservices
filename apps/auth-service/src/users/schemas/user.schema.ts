import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true, default: false })
  isVerified: boolean;

  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }] })
  // comments: Comment[];

  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }] })
  // posts: Post[];

  // @Prop({ type: String, enum: Role, default: Role.Guest })
  // role: Role;
}
export const UserSchema = SchemaFactory.createForClass(User);
