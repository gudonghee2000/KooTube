import express from "express";
import { getLogin, postLogin } from "../controller/userController";
import { home } from "../controller/videoController"; 
import { accessMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.route("/").get(home)
rootRouter.route("/login").all(accessMiddleware).get(getLogin).post(postLogin);

export default rootRouter;