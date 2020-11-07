import bcrypt from 'bcrypt-nodejs';
import { Document, Model, model, Schema } from 'mongoose';
import UUID from '../utils/uuid';

export interface UserDocument extends Document {
  uuid: string;
  email: string;
  password: string;
  nickname: string;
  comparePassword: (password: string) => Promise<boolean>;
  isSetupCompleted: boolean;
}

export interface UserModel extends Model<UserDocument> {
  getUserByUUID(uuid: string): Promise<UserDocument | null>;
  getUserByEmail(email: string): Promise<UserDocument | null>;
  getUser(email: string, password: string): Promise<UserDocument | null>;
  createUser(email: string, password: string): Promise<UserDocument | null>;
}

const UserSchema = new Schema<UserDocument>({
  uuid: { type: String, required: true, unique: true, default: () => UUID.generate(16) },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String, required: false },
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

UserSchema.virtual('isSetupCompleted').get(function () {
  return typeof this.nickname !== 'undefined';
});

UserSchema.statics.getUserByUUID = async function (uuid: string): Promise<UserDocument | null> {
  const user = await this.findOne({ uuid }).exec();
  return user || null;
};

UserSchema.statics.getUserByEmail = async function (email: string): Promise<UserDocument | null> {
  const user = await this.findOne({ email }).exec();
  return user || null;
};

UserSchema.statics.getUser = async function (
  email: string,
  password: string
): Promise<UserDocument | null> {
  const user = await User.getUserByEmail(email);
  if (!user) return null;

  const matches = await user.comparePassword(password);
  return matches ? user : null;
};

UserSchema.statics.createUser = async function (
  email: string,
  password: string
): Promise<UserDocument | null> {
  const exists = await User.getUserByEmail(email);
  if (exists) return null;

  const user = new User({ email, password });
  return user.save();
};

const User = model<UserDocument, UserModel>('user', UserSchema);

export default User;
