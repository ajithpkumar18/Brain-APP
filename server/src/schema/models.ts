import mongoose, { mongo, Types } from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
})

export const UserModel = mongoose.model("User", UserSchema)

const TagsSchema = new mongoose.Schema({
    title: { type: String, required: true }
})

export const TagsModel = mongoose.model("Tags", TagsSchema)

const LinkSchema = new mongoose.Schema({
    hash: { type: String },
    userId: { type: Types.ObjectId, required: true, ref: UserModel, unique: true }
})

export const LinkModel = mongoose.model("Link", LinkSchema)


const contentTypes = ["twitter", "youtube"];
const ContentShema = new mongoose.Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: Types.ObjectId, ref: TagsModel, required: true }],
    userId: { type: Types.ObjectId, ref: UserModel, required: true }
})

export const ContentModel = mongoose.model("content", ContentShema)