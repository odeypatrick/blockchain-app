const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { mailer } = require('./mailer')

exports.signup = (req, res) => {
    const { name, email, password } = req.body
    if (!email || !password) {
        res.json({success: false, msg: 'Enter all fields'})
    }
    else {
        User.findOne({ email }, (err, user) => {
            //check for server errors
            if(err) {
                return res.status(500).json({ success: false, error: "Something went wrong" })
            }
    
            // verify if email already exist
            if(user) {
                return res.status(401).json({ success: false, error: "Email Already Taken" })
            }
                //if every thing is fine. then create user
                const newUser = User(req.body);
                newUser.save(function (err, newUser) {
                    if (err) {
                        res.json({success: false, error: `Failed to save - ${err}`})
                    }
                    else {
                        res.json({success: true, msg: 'Successfully saved'})
                    }
                })
        })
    }
}

exports.login = (req, res) => {
    const { email, password } = req.body
    User.findOne({
        email
    }, function (err, user) {
        // Handle server errors
            if (err) return res.status(500).send({success: false, msg: 'Something went wrong'})
            // Check if user exists
            if (!user) return res.status(403).send({success: false, msg: 'Authentication Failed, User not found'})
            user.comparePassword(password, (err, isMatch) => {
                if (isMatch && !err) {
                    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY)
                    res.status(200).json({success: true, token: token, role: user.role, userId: user._id})
                }
                else {
                    return res.status(403).send({success: false, msg: 'Authentication failed, wrong password'})
                }
            })
    })
}

exports.getUserData = (req, res) => {
    User.findOne({ _id: req.user.userId }).exec()
    .then(user => {
        const { _id, name, email, role, profileImage, phone } = user
        res.status(200).json({
            _id,
            name,
            email,
            phone,
            profileImage,
            role
        })
    })
}

exports.isAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    // Verify Token
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

exports.updateUser = (req, res) => {
    const { name, email, phone, address } = req.body
    if(req.file) {
        User.findOneAndUpdate({ _id: req.params.id }, { $set: 
            { 
                name,
                email,
                phone,
                address,
                profileImage: req.file.location
            }
        })
        .then(user => res.status(201).json(user))
        .catch(err => res.status(500).json({ error: err }))
    } else {
        User.findOneAndUpdate({ _id: req.params.id }, { $set: 
            { 
                name,
                email,
                phone,
                address,
            }
        })
        .then(user => res.status(201).json(user))
        .catch(err => res.status(500).json({ error: err }))
    }
}

// FORGOT PASSWORD AND RESET PASSWORD

// forgot password
exports.forgotPassword = (req, res) => {
    const { email } = req.body

    User.findOne({ email }, (err, user) => {
        if(err || !user ) {
            return res.status(401).json({ 
                error: 'User with provided email does not exist' 
            })
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, { expiresIn: '10m' })

        // Send email
        const subject = "Altire - Password reset link";
        const body = `
            <p>Please use the following link to reset your password: </p>
            <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
            <hr/>
            <p>This email may contain sensitive information</p>
            <p>https://altire.kemango.com.ng</p>
        `;

        // Populating the db > user > resetPasswordLnk
        return User.updateOne({ resetPasswordLink: token }, (err, success) => {
            if(err){
                return res.status(500).json({ error: "Something went wrong" })
            }
            // if success send mail
            mailer(process.env.EMAIL_FROM, email, subject, body)
            .then(() => {
                res.status(200).json({ 
                    message: `Email has been sent to ${email}. Follow the instructions to reset your password. Link expires in 10 minutes` 
                })
            })
            .catch(err => res.status(500).json({ error: err }))
        })
    })
}

// reset password
exports.resetPassword = (req, res) => {

}