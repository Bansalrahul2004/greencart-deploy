import mongoose from 'mongoose';
import { Product } from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();

const addSampleBadges = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Sample badge data for different products
        const sampleBadges = [
            {
                name: 'Fresh Organic Tomatoes',
                badges: {
                    stockQuantity: 15,
                    featured: true,
                    green: true,
                    ecoType: 'organic',
                    popular: true
                }
            },
            {
                name: 'Amul Milk',
                badges: {
                    stockQuantity: 8,
                    bestSeller: true,
                    popular: true,
                    freeShipping: true
                }
            },
            {
                name: 'Brown Bread',
                badges: {
                    stockQuantity: 25,
                    green: true,
                    ecoType: 'sustainable',
                    featured: true
                }
            },
            {
                name: 'Fresh Apples',
                badges: {
                    stockQuantity: 5,
                    popular: true,
                    green: true,
                    ecoType: 'local'
                }
            },
            {
                name: 'Paneer',
                badges: {
                    stockQuantity: 12,
                    bestSeller: true,
                    freeShipping: true
                }
            }
        ];

        for (const sample of sampleBadges) {
            const product = await Product.findOne({ name: { $regex: sample.name, $options: 'i' } });
            if (product) {
                await Product.findByIdAndUpdate(product._id, sample.badges);
                console.log(`Updated badges for: ${product.name}`);
            }
        }

        console.log('Sample badges added successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error adding sample badges:', error);
        process.exit(1);
    }
};

addSampleBadges(); 