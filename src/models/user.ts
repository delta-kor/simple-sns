import bcrypt from 'bcrypt-nodejs';
import UUID from '../utils/uuid';
import { Document, Model, model, Schema } from 'mongoose';

export interface UserDocument extends Document {
  uuid: string;
  email: string;
  password: string;
  nickname: string;
  comparePassword: (password: string) => Promise<boolean>;
}

export interface UserModel extends Model<UserDocument> {
  getUserByUUID(uuid: string): Promise<UserDocument | null>;
  getUserByEmail(email: string): Promise<UserDocument | null>;
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

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    bcrypt.compare(password, this.password, (error, matches) => {
      if (error) return reject(error);
      return resolve(matches);
    });
  });
};

UserSchema.statics.getUserByUUID = async function (uuid: string): Promise<UserDocument | null> {
  const user = await this.findOne({ uuid }).exec();
  return user || null;
};

UserSchema.statics.getUserByUUID = async function (email: string): Promise<UserDocument | null> {
  const user = await this.findOne({ email }).exec();
  return user || null;
};

const User = model<UserDocument, UserModel>('user', UserSchema);

export default User;
