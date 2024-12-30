import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    
    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['admin', 'user'], default: 'user'
    }

},
{timestamps: true})

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;