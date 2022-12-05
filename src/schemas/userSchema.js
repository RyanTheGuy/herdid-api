import mongoose from "mongoose";
import uuid from "node-uuid";
import bcrypt from "bcrypt";
import isEmail from "validator";

const SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
    _id: { type: String, default: uuid.v4() },
    email: {
        type: String,
        required: true,
        index: { unique: true },
        validate: [isEmail, "Invalid Email"],
    },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    apiKey: { type: String },
    registered: { created: new Date() },
    address: {
        street: String,
        city: String,
        county: String,
        state: String,
        country: String,
    },
    locations: [
        {
            name: String,
            latitude: String,
            longitude: String,
        },
    ],
});

UserSchema.pre("save", function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified("password")) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

let User = mongoose.model("User", UserSchema);
export default User;
