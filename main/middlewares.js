import multer from "multer";

export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user || {};
    next();
}

export const accessMiddleware = (req, res, next) => {
    if (res.locals.loggedIn) {
        req.flash("error", "Not authorized");
        return res.redirect("/");
    } else {
        return next();
    }
}

export const protectMiddleware = (req, res, next) => {
    if (!res.locals.loggedIn) {
        req.flash("error", "Log in first.");
        return res.redirect("/login");
    }
    next();
}

export const uploadVideo = multer({
    dest: "uploads/videos",
});

export const uploadAvatar = multer({
    dest: "uploads/avatar",
})