import { Router } from "express";

export const userRouter = Router()

userRouter.get("/signin", (req, res) => {
    console.log("Hello");

    res.send("Signin")
})

// module.exports = {
//     "userRouter": userRouter
// }