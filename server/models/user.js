const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    phone: {
        type: String,
        require: true,
        unique: true
    },
    address: {
        type: String,
    },
    photo: {
        type: Buffer
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: Number,
        require: true
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


userSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err)
                }
                user.password = hash;
                next()
            })
        })
    }
    else {
        return next()
    }
})

userSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if(err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}

module.exports = mongoose.model("user", userSchema);
