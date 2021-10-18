import express from "express";
import { appendView } from "../controller/videoController";

const apiRouter = express.Router()

apiRouter.route("/videos/:id/view").post(appendView);

export default apiRouter