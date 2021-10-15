import express from "express";
import { getChangePassword, getEdit, getJoin, logout, postChangePassword, postEdit, postJoin, see } from "../controller/userController";
import { accessMiddleware, uploadAvatar, protectMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.route("/join").all(accessMiddleware).get(getJoin).post(postJoin);
userRouter.route("/logout").all(protectMiddleware).get(logout);
userRouter.route("/:id").get(see);
userRouter.route("/:id/edit").all(protectMiddleware).get(getEdit).post(uploadAvatar.single("avatar"), postEdit);
userRouter.route("/:id/changepassword").all(protectMiddleware).get(getChangePassword).post(postChangePassword);


export default userRouter;