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
    
}

export const see = (req, res) => {

}

export const getEdit = (req, res) => {

}

export const postEdit = (req, res) => {

}


