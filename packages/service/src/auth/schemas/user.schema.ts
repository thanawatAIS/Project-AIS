import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../roles/roles.enum';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop()
  password: string;

  @Prop({ type: String, enum: Role, default: Role.User })
  role: Role;

  // @Prop({ type: String, enum: Role, default: Role.Admin })
  // role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
