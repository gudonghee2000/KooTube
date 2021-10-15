import express from "express";
import { getUpload, postUpload, watch, getEdit, postEdit, remove } from "../controller/videoController";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

videoRouter.route("/upload").get(getUpload).post(uploadVideo.single("video"), postUpload);
videoRouter.route("/:id").get(watch);
videoRouter.route("/:id/edit").get(getEdit).post(postEdit);
videoRouter.route("/:id/remove").get(remove);

export default videoRouter;