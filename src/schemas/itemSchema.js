import mongoose from "mongoose";
import User from "./userSchema";

var CowSchema = new mongoose.Schema({
    UUID: {
        type: String,
        default: uuid.v4(),
        required: true,
        index: { unique: true },
    },
    created: { created: new Date() },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    classification: {
        type: String,
        enum: ["heifer", "cow", "steer", "bull", "cull cow", "free martin"],
        required: true,
    },
    sex: { type: String, enum: ["m", "f"] },
    injections: { type: [String] },
    notes: { type: [String] },
    location: String,

    mother: String,
    father: String,
    offspring: [String],
    breed: String,

    tag: String,
    dateOfBirth: Date,
    dateOfAcquisition: Date,
    dateOfDeath: Date,

    imgS3Url: String,
});

CowSchema.pre("save", function (next) {
    if (this.classification) {
        if (["bull", "steer"].contains(this.classification)) {
            this.sex = "m";
        } else {
            this.sex = "f";
        }
    }
    next();
});

let Cow = mongoose.model("Item", CowSchema);
export default Cow;
