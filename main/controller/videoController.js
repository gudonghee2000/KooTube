import Video from "../models/Video";

export const home = async (req, res) => {
    const videos = await Video.find({}).sort({ createdAt: "desc" })
    res.render("home", { pageTitle: "Home", videos });
}

export const getUpload = (req, res) => {
    res.render("upload", { pageTitle: "Upload" });
}

export const postUpload = async (req, res) => {
    const { title, description, hashtags } = req.body;
    const video = req.file;
    await Video.create({
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
        fileUrl: video.path,
    })
    res.redirect("/")
}

export const watch = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not found." });
    }
    return res.render("watch", { pageTitle: video.title, video });
}

export const getEdit = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not found." });
    }
    return res.render("edit", { pageTitle: "Edit : " + video.title, video });
}

export const postEdit = async (req, res) => {
    const { title, description, hashtags } = req.body;
    const { id } = req.params;
    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect("/");
}

export const remove = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not found." });
    }
    await Video.findByIdAndRemove(id);
    return res.redirect("/");
}