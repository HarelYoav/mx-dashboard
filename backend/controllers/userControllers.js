const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);



const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password, pic} = req.body;

    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User Already Exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
            createdAt: user.createdAt,
        });
    } else {
        res.status(400).send('Error creating new user');
        throw new Error('Error creating new user');
    }
});

const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
            createdAt: user.createdAt,
        });
    } else if (user) {
        res.status(400);
        throw new Error('Password not much');
    } else {
        res.status(400).send('Email is not correct or dosent exists');
        throw new Error('Email is not correct or dosent exists');
    }

});

const authGoogle = asyncHandler(async (req, res) => {

    const { tokenID }  = req.body;

    if(tokenID) {

        const ticket = await client.verifyIdToken({
            idToken: tokenID,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        const {sub, email, name}= payload;
        const googleId = sub;

        const user = await User.findOne({email})

        if (user){
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: generateToken(user._id),
                createdAt: user.createdAt,
            });
        } else {
            const user = await User.create({
                name,
                email,
                googleId,
            });

            if (user) {
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    pic: user.pic,
                    token: generateToken(user._id),
                    createdAt: user.createdAt,
                });
            } else {
                res.status(400);
                throw new Error('error create google user')
            }
        }
    } else {
        res.status(500).send('no token');
    }


});

const authFacebook = asyncHandler(async (req, res) => {
    const {name, email, facebookId} = req.body;

    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User Already Exists');
    }

    const user = await User.create({
        name,
        email,
        facebookId,
    });

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
            createdAt: user.createdAt,
        });
    } else {
        res.status(400).send('Error creating new user');
        throw new Error('Error creating new user');
    }
});


const updateProfilePicture = asyncHandler(async (req, res) => {
    const {email, pic} = req.body;

    const user = await User.findOne({email});

    user.pic = pic || user.pic;

    const updatedUser = await user.save();

    console.log(updatedUser);

    if(updatedUser){
        res.status(201).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            pic: updatedUser.pic,
            token: generateToken(updatedUser._id),
            createdAt: updatedUser.createdAt,
        });
    } else {
        res.status(400).send('Error updating profile picture');
        throw new Error('Error updating profile picture');
    }
});

module.exports = {registerUser, authUser, authGoogle, updateProfilePicture, authFacebook};