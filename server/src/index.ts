import express from "express"
import jwt from "jsonwebtoken";
import mongoose, { mongo, Types } from "mongoose";
import bcrypt from "bcrypt"
import cookieParser from "cookie-parser"
import { ContentModel, LinkModel, UserModel } from "./schema/models";
import { userMiddleware } from "./middlewares/userMiddleware";
import { random } from "./utils";
import cors from "cors"

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors())

const uri = process.env.MONGO;
const main = async () => {

    try {
        if (!uri) return;
        const connection = await mongoose.connect(uri);
    } catch (e) {
        console.log(e);
    }
}

app.post("/api/v1/user/signup", async (req, res) => {

    let username = req.body.username;
    let password = req.body.password;
    password = await bcrypt.hash(password, 3)

    try {
        await UserModel.create({
            username,
            password
        })

        res.status(200).json({ message: "success" })

    } catch (e) {
        res.status(411).json({ message: "User already exists" })
    }
})
app.post("/api/v1/user/signin", async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    try {
        let User = await UserModel.findOne({
            username
        })

        if (User) {
            let isUser = bcrypt.compareSync(password, User.password)
            if (isUser) {
                let token = jwt.sign({ id: User._id }, "asasasas")
                res.status(200).cookie("token", token).json({ "token": token, message: "Success" });
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

        const content = await ContentModel.find({
            userId
        }).populate("userId", "username sirname")
        res.status(200).json({ content })
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
        res.status(200).json({ message: "Content added succesfully" })
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

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {

    const share = req.body.share;
    if (share) {
        // @ts-ignore
        let existingLink = await LinkModel.findOne({ userId: req.userId })

        if (existingLink) {
            res.status(200).json({ "link": existingLink.hash })
            return
        }

        const hash = random(10)
        await LinkModel.create({
            // @ts-ignore
            userId: req.userId,
            hash: hash
        })

        res.status(200).json({ "link": hash })

    } else {
        await LinkModel.deleteOne({
            // @ts-ignore
            userId: req.userId
        })

        res.status(200).json({ "link": null })
    }
})
app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const link = req.params.shareLink

    try {
        let userlink = await LinkModel.findOne({ hash: link })

        if (!userlink) {
            res.status(404).send("Sorry access not granted")
            return
        }

        let contents = await ContentModel.find({ userId: userlink.userId })
        let user = await UserModel.findOne({ _id: userlink.userId })

        if (!user) {
            res.status(404).send({
                message: "User not found. ideally should not happen",
            })

            return;
        }

        res.status(200).json({
            username: user.username,
            content: contents
        })
    }
    catch (e) {
        console.log(e)
        res.status(400).send({ "error": e })
    }
})

app.listen(3000, () => {
    main();
    console.log("Server running");

})