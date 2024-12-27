import express from "express"
import jwt from "jsonwebtoken";
import mongoose, { mongo, Types } from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
})

const UserModel = mongoose.model("User", UserSchema)

const TagsSchema = new mongoose.Schema({
    title: { type: String, required: true }
})

const TagsModel = mongoose.model("Tags", TagsSchema)

const LinkSchema = new mongoose.Schema({
    hash: { type: String, required: true },
    userId: { type: Types.ObjectId, required: true, ref: UserModel }
})

const LinkModel = mongoose.model("Link", LinkSchema)


const contentTypes = ['image', 'video', 'article', 'audio'];
const ContentShema = new mongoose.Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: Types.ObjectId, ref: TagsModel, required: true }],
    userId: { type: Types.ObjectId, ref: UserModel, required: true }
})

const ContentModel = mongoose.model("content", ContentShema)

module.exports = {
    UserModel,
    TagsModel,
    LinkModel,
    ContentModel
}

const app = express();
app.use(express.json())

const main = async () => {

    try {
        const connection = await mongoose.connect("")
    } catch (e) {
        console.log(e);
    }
}

app.post("/api/v1/user/signup", async (req, res) => {
    let name = req.body.name;
    let password = req.body.password;

    try {
        const User = await UserModel.create({
            username: name,
            password: password
        })

        if (User) {
            res.status(200).json({ message: "success" })
        }
        else {
            res.status(500).json({ message: "fail" })
        }
    } catch (e) {
        console.log(e)

    }
})
app.post("/api/v1/user/signin", async (req, res) => {
    let name = req.body.name;
    let password = req.body.password;

    try {
        let User = await UserModel.findOne({
            username: name, password: password
        })

        if (User) {
            let token = jwt.sign({ username: User._id }, "")
            res.status(200).cookie("token", token).json({ message: "Success" });
        }
        else {
            res.status(400).json({ message: "No user exists" });
        }
    }
    catch (e) {
        console.log(e)
    }
})
app.get("/api/v1/user/content", () => {
    console.log("")
})
app.get("/api/v1/user/content", () => {
    console.log("")
})
app.get("/api/v1/brain/share/", () => {
    console.log("")
})
app.get("/api/v1/brain/:shareLink", () => { })

app.listen(3000, () => {
    main();
    console.log("Server running");

})