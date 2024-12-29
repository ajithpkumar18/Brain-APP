"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const models_1 = require("./schema/models");
const userMiddleware_1 = require("./middlewares/userMiddleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield mongoose_1.default.connect("mongodb+srv://ajith:PBafcyTqPFqKJCth@bookingapp.6fbssia.mongodb.net/SecondBrainApp");
    }
    catch (e) {
        console.log(e);
    }
});
app.post("/api/v1/user/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let name = req.body.name;
    let password = req.body.password;
    password = yield bcrypt_1.default.hash(password, 3);
    try {
        yield models_1.UserModel.create({
            username: name,
            password: password
        });
        res.status(200).json({ message: "success" });
    }
    catch (e) {
        res.status(411).json({ message: "User already exists" });
    }
}));
app.post("/api/v1/user/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let name = req.body.name;
    let password = req.body.password;
    try {
        let User = yield models_1.UserModel.findOne({
            username: name
        });
        if (User) {
            let isUser = bcrypt_1.default.compareSync(password, User.password);
            if (isUser) {
                let token = jsonwebtoken_1.default.sign({ id: User._id }, "sssddsddsd");
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
        console.log(e);
    }
}));
app.get("/api/v1/user/content", userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.userId;
    try {
        const contents = yield models_1.ContentModel.find({
            userId
        }).populate("userId", "username sirname");
        res.send(contents);
    }
    catch (e) {
        console.log(e);
    }
}));
const contentTypes = ['image', 'video', 'article', 'audio'];
app.post("/api/v1/user/content", userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        let Content = yield models_1.ContentModel.create({
            link,
            type,
            title,
            userId,
        });
        if (Content) {
            res.status(200).json({ message: "Content added succesfully" });
        }
        else {
            res.status(404).json({ message: "Unsucessfull " });
        }
    }
    catch (e) {
        console.log(e);
        res.status(411).json({ message: "Caught an error" });
    }
}));
app.put("/api/v1/user/content", userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.userId;
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    const contentId = req.body.id;
    try {
        yield models_1.ContentModel.findOneAndUpdate({
            userId,
            _id: contentId
        }, {
            link,
            type,
            title
        });
        res.status(200).json({ mesaage: "successful" });
    }
    catch (e) {
        console.log(e);
    }
}));
app.delete("/api/v1/user/content", userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.userId;
    const contentId = req.body.id;
    console.log(userId);
    try {
        yield models_1.ContentModel.deleteOne({ _id: contentId, userId });
        res.status(200).json({ message: "deleted" });
    }
    catch (e) {
        console.log(e);
        res.status(404).json("Faced some error");
    }
}));
app.get("/api/v1/brain/share/", () => {
    console.log("");
});
app.get("/api/v1/brain/:shareLink", () => { });
app.listen(3000, () => {
    main();
    console.log("Server running");
});
