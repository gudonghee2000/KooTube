import express from "express";
import rootRouter from "./router/rootRouter";
import userRouter from "./router/userRouter";
import videoRouter from "./router/videoRouter";
import apiRouter from "./router/apiRouter";
import bodyParser from "body-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";
import "./db.js";

const PORT = 7000;

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/main/views");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: "hey",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017/k",
    })
}));

app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/api", apiRouter);

app.listen(PORT, () => {
    console.log(`Server listen ${PORT}PORT🏍`);
})