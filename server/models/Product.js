import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type: String, required: true },
    description: {type: Array, required: true},
    price: {type: Number, required: true },
    offerPrice: {type: Number, required: true },
    image: {type: Array, required: true },
    category: {type: String, required: true },
    inStock: {type: Boolean, default: true },
    // Smart Badge Fields
    stockQuantity: {type: Number, default: 100 },
    salesCount: {type: Number, default: 0 },
    featured: {type: Boolean, default: false },
    bestSeller: {type: Boolean, default: false },
    popular: {type: Boolean, default: false },
    green: {type: Boolean, default: false },
    ecoType: {type: String, enum: ['organic', 'local', 'sustainable', 'recycled'], default: null },
    freeShipping: {type: Boolean, default: false },
    dietaryTags: {type: [String], default: []},
}, { timestamps: true, collection: 'products' })

const Product = mongoose.models.product || mongoose.model('product', productSchema)

export default Product