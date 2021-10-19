import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatarUrl: { type: String, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "comment" }],
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "video" }]
});

userSchema.pre('save', async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 5);
    }
    next();
})

const userModel = mongoose.model("user", userSchema);

export default userModel;