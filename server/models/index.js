import mongoose from 'mongoose';

// Import models in the correct order to ensure proper registration
import User from './User.js';
import Product from './Product.js';
import Address from './Address.js';
import Order from './Order.js';
import Review from './Review.js';

// Ensure all models are registered
const models = {
    User,
    Product,
    Address,
    Order,
    Review
};

// Verify model registration
Object.keys(models).forEach(modelName => {
    const model = models[modelName];
    if (!model) {
        console.error(`Model ${modelName} failed to register`);
    }
});

export { User, Product, Address, Order, Review }; 