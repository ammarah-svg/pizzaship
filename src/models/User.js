import bcrypt from 'bcrypt';
import { model, models, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    username: {type: String},
    email: { type: String, required: true, unique: true },
    image: {type: String},
    password: {
      type: String,
      required: true,
      validate: {
        validator: pass => {
          if (!pass || pass.length < 5) {
            throw new Error('Password must be at least 5 characters');
          }
        },
        message: 'Invalid password',
      },
    },
    admin: {
      type: Boolean,
      default: false,
    },

  },
  { timestamps: true }
);




export const User = models?.User || model('User', UserSchema);
