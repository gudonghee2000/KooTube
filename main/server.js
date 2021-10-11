import express from "express";
import rootRouter from "./router/rootRouter";
import userRouter from "./router/userRouter";
import videoRouter from "./router/videoRouter";

const PORT = 4000;

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/main/views");

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

app.listen(PORT, () => {
    console.log(`Server listen ${PORT}PORT🏍`);
    console.log(process.cwd()+"/main/views");
})