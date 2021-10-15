import express from "express";
import { getChangePassword, getEdit, getJoin, logout, postChangePassword, postEdit, postJoin, see } from "../controller/userController";
import { uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter.route("/join").get(getJoin).post(postJoin);
userRouter.route("/logout").get(logout);
userRouter.route("/:id").get(see);
userRouter.route("/:id/edit").get(getEdit).post(uploadAvatar.single("avatar"), postEdit);
userRouter.route("/:id/changepassword").get(getChangePassword).post(postChangePassword);


export default userRouter;