import express from "express";
import { home } from "../controller/videoController"; 

const rootRouter = express.Router();

rootRouter.route("/").get(home)

export default rootRouter;