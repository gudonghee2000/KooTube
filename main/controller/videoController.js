import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";

export const home = async (req, res) => {
    const videos = await Video.find({}).sort({ createdAt: "desc" }).populate("owner")
    res.render("home", { pageTitle: "Home", videos });
}

export const getUpload = (req, res) => {
    res.render("upload", { pageTitle: "Upload" });
}

export const postUpload = async (req, res) => {
    const { title, description, hashtags } = req.body;
    const video = req.file;
    const { _id } = req.session.user;
    const newVideo = await Video.create({
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
        fileUrl: video.path,
        owner: _id,
    })
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/")
}

export const watch = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id).populate("owner").populate("comments");
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not found." });
    }
    return res.render("watch", { pageTitle: video.title, video });
}

export const getEdit = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    const { _id } = req.session.user;
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not found." });
    }
    if (String(video.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }
    return res.render("edit", { pageTitle: "Edit : " + video.title, video });
}

export const postEdit = async (req, res) => {
    const { title, description, hashtags } = req.body;
    const { id } = req.params;
    const video = await Video.findById(id);
    const { _id } = req.session.user;
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not found." });
    }
    if (String(video.owner) !== String(_id)) {
        req.flash("error", "Your are not the owner of the video.");
        return res.status(403).redirect("/");
    }
    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
    });
    req.flash("success", "Changed saved.");
    return res.redirect("/");
}

export const remove = async (req, res) => {
    const { id } = req.params;
    const {
        user: { _id },
    } = req.session;
    const video = await Video.findById(id);
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not found." });
    }
    if (String(video.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
}

export const appendView = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const video = await Video.findById(id);
    if (!video) {
        return res.sendStatus(404);
    }
    video.meta.views = video.meta.views + 1;
    await video.save();
    return res.sendStatus(200);
}

export const appendComment = async (req, res) => {
    const {
        session: { user },
        body: { text },
        params: { id },
    } = req;
    const video = await Video.findById(id)
    if (!video) {
        return res.sendStatus(404);
    }
    const comment = await Comment.create({
        text,
        owner: user._id,
        video: video._id,
    });
    video.comments.push(comment._id)
    video.save();
    return res.status(201).json({ newCommentId: comment._id });
}

export const deleteComment = async (req, res) => {
    const {
        session: { user },
        params: { videoId, commentId },
    } = req;
    const video = await Video.findById(videoId);
    if (!video) {
        return res.sendStatus(404);
    }
    const comment = await Comment.findById(commentId);
    if (!comment) {
        return res.sendStatus(404);
    }
    if (String(comment.owner) !== String(user._id)) {
        return res.status(403);
    }
    video.comments = video.comments.filter(
        (comment) => String(comment._id) !== commentId
    );
    await video.save();
    await Comment.findByIdAndDelete(commentId);
    return res.sendStatus(200);
}

