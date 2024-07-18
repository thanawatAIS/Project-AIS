import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, UpdateQuery} from 'mongoose';
import { Role } from '../roles/roles.enum';
import { format } from 'date-fns';

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

  // @Prop({ type: Date })
  // createdAt: Date;

  // @Prop({ type: Date })
  // updatedAt: Date;


  @Prop({
    type: String,
    set: (val: Date) => format(val, 'yyyy-MM-dd')
  })
  createdAt: string;

  @Prop({
    type: String,
    set: (val: Date) => format(val, 'yyyy-MM-dd')
  })
  updatedAt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Middleware to format timestamps
UserSchema.pre('save', function (next) {
  const now = new Date();
  const formattedDate = format(now, 'yyyy-MM-dd');

  if (!this.createdAt) {
    this.createdAt = formattedDate;
  }

  this.updatedAt = formattedDate;
  next();
});

UserSchema.pre('findOneAndUpdate', function (next) {
  const now = new Date();
  const formattedDate = format(now, 'yyyy-MM-dd');

  const update = this.getUpdate() as UpdateQuery<any>;
  if (update) {
    if (update.$set) {
      update.$set.updatedAt = formattedDate;
    } else {
      update.updatedAt = formattedDate;
    }
  }
  next();
});

UserSchema.pre('updateOne', function (next) {
  const now = new Date();
  const formattedDate = format(now, 'yyyy-MM-dd');

  const update = this.getUpdate() as UpdateQuery<any>;
  if (update) {
    if (update.$set) {
      update.$set.updatedAt = formattedDate;
    } else {
      update.updatedAt = formattedDate;
    }
  }
  next();
});