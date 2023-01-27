import { Schema, model, Document } from 'mongoose';
import { userProfileType } from "./user.types";
import bcrypt from 'bcryptjs';

export interface UserDocument extends Document {
  userName: string;
  email: string;
  password: string; // 1234 -> hash - SHA256 -> 64 chars -> 32 bytes ->
  avatar?: string;
  role: 'USER' | 'ADMIN';
  isActive: boolean;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt: Date;
  updatedAt: Date;

  fullName: string;
  profile: userProfileType;
  comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  avatar: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER',
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
}, {
  timestamps: true,
  versionKey: false,
});


// Middlewares
UserSchema.pre('save', async function save(next: Function) {
  const user = this as UserDocument;

  try {
    if(!user.isModified('password')) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
  } catch (error: any) {
    next(error);
  }
});

// Virtuals
UserSchema.virtual('fullName').get(function fullName(){
  const { userName } = this

  return `${userName}`
});

UserSchema.virtual('profile').get(function profile() {
  const { userName, email, avatar, role } = this;

  return {
    userName,
    email,
    avatar,
    role,
  };

});

// Methods
async function comparePassword(this: UserDocument, candidatePassword: string, next: Function): Promise<boolean> {
  const user = this;

  try {
    const isMatch = await bcrypt.compare(candidatePassword, user.password)

    return isMatch;
  } catch (error: any) {
    next(error);
    return false;
  }
};

UserSchema.methods.comparePassword = comparePassword;

const User = model<UserDocument>('user', UserSchema);

export default User;
