import express from "express";
import { getUpload, postUpload, watch, getEdit, postEdit, remove } from "../controller/videoController";
import { protectMiddleware, uploadVideo } from "../middlewares";

const videoRouter = express.Router();

videoRouter.route("/upload").all(protectMiddleware).get(getUpload).post(uploadVideo.single("video"), postUpload);
videoRouter.route("/:id").get(watch);
videoRouter.route("/:id/edit").all(protectMiddleware).get(getEdit).post(postEdit);
videoRouter.route("/:id/remove").all(protectMiddleware).get(remove);

export default videoRouter;