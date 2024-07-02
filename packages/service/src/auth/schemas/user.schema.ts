import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../roles/roles.enum'; // Assuming Role enum is defined correctly

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
  role: Role; // Use Role enum for type safety

  // If you default to 'admin':
  // @Prop({ type: String, enum: Role, default: Role.Admin })
  // role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
