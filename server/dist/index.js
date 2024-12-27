"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const mongoose_1 = __importStar(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});
const UserModel = mongoose_1.default.model("User", UserSchema);
const TagsSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true }
});
const TagsModel = mongoose_1.default.model("Tags", TagsSchema);
const LinkSchema = new mongoose_1.default.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose_1.Types.ObjectId, required: true, ref: UserModel }
});
const LinkModel = mongoose_1.default.model("Link", LinkSchema);
const contentTypes = ['image', 'video', 'article', 'audio'];
const ContentShema = new mongoose_1.default.Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: mongoose_1.Types.ObjectId, ref: TagsModel, required: true }],
    userId: { type: mongoose_1.Types.ObjectId, ref: UserModel, required: true }
});
const ContentModel = mongoose_1.default.model("content", ContentShema);
module.exports = {
    UserModel,
    TagsModel,
    LinkModel,
    ContentModel
};
const app = (0, express_1.default)();
app.use(express_1.default.json());
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
    try {
        const User = yield UserModel.create({
            username: name,
            password: password
        });
        if (User) {
            res.status(200).json({ message: "success" });
        }
        else {
            res.status(500).json({ message: "fail" });
        }
    }
    catch (e) {
        console.log(e);
    }
}));
app.post("/api/v1/user/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let name = req.body.name;
    let password = req.body.password;
    try {
        let User = yield UserModel.findOne({
            username: name, password: password
        });
        if (User) {
            let token = jsonwebtoken_1.default.sign({ username: User._id }, "sssddsddsd");
            res.status(200).cookie("token", token).json({ message: "Success" });
        }
        else {
            res.status(400).json({ message: "No user exists" });
        }
    }
    catch (e) {
        console.log(e);
    }
}));
app.get("/api/v1/user/content", () => {
    console.log("");
});
app.get("/api/v1/user/content", () => {
    console.log("");
});
app.get("/api/v1/brain/share/", () => {
    console.log("");
});
app.get("/api/v1/brain/:shareLink", () => { });
app.listen(3000, () => {
    main();
    console.log("Server running");
});
