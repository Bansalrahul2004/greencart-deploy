import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true },
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true },
    cartItems: {type: Object, default: {} },
    
    // Profile Information
    phone: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    dateOfBirth: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other', 'prefer-not-to-say', ''],
        default: ''
    },
    profileImage: {
        type: String,
        default: ''
    },
    address: {
        street: {
            type: String,
            default: ''
        },
        city: {
            type: String,
            default: ''
        },
        state: {
            type: String,
            default: ''
        },
        zipCode: {
            type: String,
            default: ''
        },
        country: {
            type: String,
            default: ''
        }
    },
    
    // Loyalty Points System
    points: {
        type: Number,
        default: 0,
        min: 0
    },
    totalPointsEarned: {
        type: Number,
        default: 0
    },
    totalPointsRedeemed: {
        type: Number,
        default: 0
    },
    pointsHistory: [{
        transactionType: {
            type: String,
            enum: ['earned', 'redeemed', 'expired'],
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    membershipTier: {
        type: String,
        enum: ['Bronze', 'Silver', 'Gold', 'Platinum'],
        default: 'Bronze'
    },
    dietaryPreferences: {
        type: [String],
        default: []
    }
}, {minimize: false, timestamps: true})

const User = mongoose.models.user || mongoose.model('user', userSchema)

export default User