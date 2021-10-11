import express from "express";
import { getLogin, postLogin } from "../controller/userController";
import { home } from "../controller/videoController"; 

const rootRouter = express.Router();

rootRouter.route("/").get(home)
rootRouter.route("login").get(getLogin).post(postLogin);

export default rootRouter;