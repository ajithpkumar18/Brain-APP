import express from "express"
import jwt from "jsonwebtoken";
import mongoose, { mongo, Types } from "mongoose";
import bcrypt from "bcrypt"
import cookieParser from "cookie-parser"
import { ContentModel, UserModel } from "./schema/models";
import { userMiddleware } from "./middlewares/userMiddleware";


const app = express();
app.use(express.json())
app.use(cookieParser())

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
    password = await bcrypt.hash(password, 3)

    try {
        await UserModel.create({
            username: name,
            password: password
        })

        res.status(200).json({ message: "success" })

    } catch (e) {
        res.status(411).json({ message: "User already exists" })
    }
})
app.post("/api/v1/user/signin", async (req, res) => {
    let name = req.body.name;
    let password = req.body.password;

    try {
        let User = await UserModel.findOne({
            username: name
        })

        if (User) {
            let isUser = bcrypt.compareSync(password, User.password)
            if (isUser) {
                let token = jwt.sign({ id: User._id }, "")
                res.status(200).cookie("token", token).json({ message: "Success" });
            }
            else {
                res.status(400).json({ message: "No user exists" });
            }
        }
        else {
            res.status(400).json({ message: "No user exists" });
        }
    }
    catch (e) {
        console.log(e)
    }
})

app.get("/api/v1/user/content", userMiddleware, async (req, res) => {

    // @ts-ignore
    const userId = req.userId;
    try {

        const contents = await ContentModel.find({
            userId
        }).populate("userId", "username sirname")
        res.send(contents)
    }
    catch (e) {
        console.log(e);
    }

})

const contentTypes = ['image', 'video', 'article', 'audio'];
app.post("/api/v1/user/content", userMiddleware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    // const tags = req.body.tags;
    //@ts-ignore
    const userId = req.userId;

    // let contentExists = contentTypes.includes(type);

    // if (!contentExists) {
    //     res.status(404).json({ message: "invalid type mentioned" })
    //     return
    // }
    try {
        let Content = await ContentModel.create({
            link,
            type,
            title,
            userId,
        })

        if (Content) {
            res.status(200).json({ message: "Content added succesfully" })
        }
        else {
            res.status(404).json({ message: "Unsucessfull " })
        }
    }
    catch (e) {
        console.log(e);
        res.status(411).json({ message: "Caught an error" })
    }

})
app.put("/api/v1/user/content", userMiddleware, async (req, res) => {

    // @ts-ignore
    const userId = req.userId;
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    const contentId = req.body.id;

    try {
        await ContentModel.findOneAndUpdate({
            userId,
            _id: contentId
        }, {
            link,
            type,
            title
        })

        res.status(200).json({ mesaage: "successful" })
    }
    catch (e) {
        console.log(e)
    }
})

app.delete("/api/v1/user/content", userMiddleware, async (req, res) => {
    // @ts-ignore
    const userId = req.userId;
    const contentId = req.body.id;
    console.log(userId)
    try {
        await ContentModel.deleteOne({ _id: contentId, userId })
        res.status(200).json({ message: "deleted" })
    }
    catch (e) {
        console.log(e)
        res.status(404).json("Faced some error")
    }
})
app.get("/api/v1/brain/share/", () => {
    console.log("")
})
app.get("/api/v1/brain/:shareLink", () => { })

app.listen(3000, () => {
    main();
    console.log("Server running");

})