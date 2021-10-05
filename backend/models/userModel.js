const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = mongoose.Schema(
    {
        name: String,
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
        },
        pic: {
            type: String,
            default: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
        },
        googleId: String,
        facebookId: String,

    },
    {
        timestamps: true,
    }
);


userSchema.pre('save' , async function(next) {
    if(!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


userSchema.methods.matchPassword = async  (enteredPassword, userPassword) => {
    return await bcrypt.compare(enteredPassword, userPassword);
}

const User = mongoose.model('User', userSchema);


module.exports = User;