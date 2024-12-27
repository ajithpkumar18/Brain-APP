"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.get("/signin", (req, res) => {
    console.log("Hello");
    res.send("Signin");
});
// module.exports = {
//     "userRouter": userRouter
// }
