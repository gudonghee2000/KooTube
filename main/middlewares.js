import multer from "multer";

export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user || {};
    next();
}

export const uploadVideo = multer({
    dest: "uploads/videos",
});

export const uploadAvatar = multer({
    dest: "uploads/avatar",
})