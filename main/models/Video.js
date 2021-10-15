import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    createdAt: { type: String, required: true, trim: true, default: Date.now },
    hashtags: [{ type: String, required: true, trim: true }],
    fileUrl: { type: String, required: true },
    meta: {
        views: { type: Number, required: true, default: 0 },
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref:"user" },
})

videoSchema.statics.formatHashtags = (hashtags) => {
    return hashtags.split(",").map((word) => word.startsWith("#") ? word : "#" + word);
}

const videoModel = mongoose.model("video", videoSchema);

export default videoModel;