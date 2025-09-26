import mongoose, { type Document, Schema } from "mongoose";

interface IUser extends Document {
	username: string;
	email: string;
	password?: string;
	createdAt: Date;
	updatedAt: Date;
}

const UserSchema: Schema = new Schema(
	{},
	{
		timestamps: true,
		versionKey: false,
	},
);

const UserModel = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default UserModel;
