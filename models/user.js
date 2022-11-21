const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        default: "https://res.cloudinary.com/omanshu840/image/upload/v1608646621/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582_wz5te3.jpg"
    },
    followers: [
        {
            type: ObjectId,
            ref: "User"
        }
    ],
    following: [
        {
            type: ObjectId,
            ref: "User"
        }
    ]
})

mongoose.model('User', userSchema)