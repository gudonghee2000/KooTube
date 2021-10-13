import User from "../models/User";

export const getLogin = (req, res) => {

}

export const postLogin = (req, res) => {

}

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join" });
}

export const postJoin = async (req, res) => {
    const pageTitle = "Join";
    const { username, name, email, password, password2 } = req.body;
    let user = await User.find({ username: username });
    if (!user) {
        return res.render("join", { pageTitle, errorMessage: "존재하는 아이디입니다." });
    }
    user = await User.find({ email: email });
    if (!user) {
        return res.render("join", { pageTitle, errorMessage: "존재하는 이메일입니다." });
    }
    if (password !== password2) {
        return res.render("join", { pageTitle, errorMessage: "비밀번호가 일치하지 않습니다." });
    }
    try {
        await User.create({
            username,
            name,
            email,
            password
        });
        return res.redirect("/")
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


