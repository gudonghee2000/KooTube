import express from "express";
import { getChangePassword, getEdit, getJoin, logout, postChangePassword, postEdit, postJoin, see } from "../controller/userController";

const userRouter = express.Router();

userRouter.route("/join").get(getJoin).post(postJoin);
userRouter.route("/logout").get(logout);
userRouter.route("/:id").get(see);
userRouter.route("/:id/edit").get(getEdit).post(postEdit);
userRouter.route("/:id/changepassword").get(getChangePassword).post(postChangePassword);


export default userRouter;