import User from "../models/User";
import bcrypt from "bcrypt";

export const getLogin = (req, res) => {
    res.render("login", { pageTitle: "Login" });
}

export const postLogin = async (req, res) => {
    const pageTitle = "Login"
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).render("login", { pageTitle, errorMessage: "존재하지 않는 계정입니다." });
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(400).render("login", { pageTitle, errorMessage: "비밀번호가 일치하지 않습니다" });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
}

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join" });
}

export const postJoin = async (req, res) => {
    const pageTitle = "Join";
    const { username, name, email, password, password2 } = req.body;
    let user = await User.findOne({ username });
    if (user) {
        return res.status(400).render("join", { pageTitle, errorMessage: "존재하는 아이디입니다." });
    }
    user = await User.findOne({ email: email });
    if (user) {
        return res.status(400).render("join", { pageTitle, errorMessage: "존재하는 이메일입니다." });
    }
    if (password !== password2) {
        return res.status(400).render("join", { pageTitle, errorMessage: "비밀번호가 일치하지 않습니다." });
    }
    try {
        await User.create({
            username,
            name,
            email,
            password
        });
        return res.redirect("/login")
    } catch (error) {

    }
}

export const logout = (req, res) => {
    const user = req.session.user;
    if (!user) {
        return res.status(404).render("404", { pageTitle: "잘못된 접근" });
    }
    req.session.destroy();
    return res.redirect("/")
}

export const see = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id).populate("videos");
    if (!user) {
        return res.status(404).render("404");
    }
    return res.render("see", { pageTitle: user.name, user });
}

export const getEdit = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        res.status(404).render("404");
    }
    if (String(id) !== String(res.locals.loggedInUser._id)) {
        res.status(404).render("404");
    }
    res.render("edit-profile", { pageTitle: `Edit ${user.name}`, user });
}

export const postEdit = async (req, res) => {
    const {
        session: {
            user: { _id, email: sessionEmail, username: sessionUsername, avatarUrl }
        },
        body: { username, email },
        file,
    } = req;
    if (sessionUsername !== username && await User.exists({ username })) {
        return res.render("edit-profile", { pageTitle: "Edit Profile", errorMessage: "입력한 ID가 존재합니다." });
    }
    if (sessionEmail !== email && await User.exists({ email })) {
        return res.render("edit-profile", { pageTitle: "Edit Profile", errorMessage: "입력한 Email이 존재합니다." });
    }
    console.log(req.session.user)
    console.log(req.file)
    await User.findByIdAndUpdate(_id, {
        avatarUrl: file ? file.path : avatarUrl,
        username,
        email,
    });
    req.session.user = {
        ...req.session.user,
        avatarUrl: file ? file.path : avatarUrl,
        username,
        email,
    };
    return res.redirect(`/users/${_id}`);
}

export const getChangePassword = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        res.status(404).render("404");
    }
    if (String(id) !== String(res.locals.loggedInUser._id)) {
        res.status(404).render("404");
    }
    res.render("changepassword", { pageTitle: `ChangePassword ${user.name}`, user });
}

export const postChangePassword = async (req, res) => {
    const {
        session: {
            user: { _id, password },
        },
        body: { currentpassword, newpassword, newpassword2 }
    } = req;
    const ok = await bcrypt.compare(currentpassword, password);
    if (!ok) {
        return res.status(400).render("changepassword", {
            pageTitle: "Change Password",
            errorMessage: "현재 비밀번호가 일치하지 않습니다."
        });
    }
    if (newpassword !== newpassword2) {
        return res.status(400).render("changepassword", {
            pageTitle: "Change Password",
            errorMessage: "새로운 비밀번호가 일치하지 않습니다."
        });
    }
    const user = await User.findById(_id);
    user.password = newpassword;
    await user.save();
    req.session.user.password = user.password;
    return res.redirect("/");
}

