import bcrypt from 'bcrypt-nodejs';
import UUID from '../utils/uuid';
import { Document, model, Schema } from 'mongoose';

export interface UserDocument extends Document {
  uuid: string;
  email: string;
  password: string;
  nickname: string;
  comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema<UserDocument>({
  uuid: { type: String, required: true, unique: true, default: () => UUID.generate(8) },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String },
});

UserSchema.pre<UserDocument>('save', function (next) {
  if (!this.isModified('password')) return next();

  bcrypt.genSalt(10, (saltError, salt) => {
    if (saltError) return next(saltError);

    bcrypt.hash(this.password, salt, undefined, (hashError, hash) => {
      if (hashError) return next(hashError);
      this.password = hash;
      return next();
    });
  });
});

UserSchema.methods.comparePassword = async function comparePassword(
  password: string
): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    bcrypt.compare(password, this.password, (error, matches) => {
      if (error) return reject(error);
      return resolve(matches);
    });
  });
};

const User = model<UserDocument>('user', UserSchema);

export default User;
