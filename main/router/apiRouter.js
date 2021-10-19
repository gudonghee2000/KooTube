import express from "express";
import { appendView, appendComment, deleteComment } from "../controller/videoController";

const apiRouter = express.Router()

apiRouter.route("/videos/:id/view").post(appendView);
apiRouter.route("/videos/:id/comment").post(appendComment);
apiRouter.route("/videos/:videoId/deletecomment/:commentId").delete(deleteComment);

export default apiRouter