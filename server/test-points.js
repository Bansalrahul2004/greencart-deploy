import mongoose from 'mongoose';
import User from './models/User.js';
import Order from './models/Order.js';
import { awardPointsForOrder } from './controllers/pointsController.js';
import 'dotenv/config';

// Connect to database
await mongoose.connect(process.env.MONGODB_URI);
console.log('Connected to MongoDB');

try {
    // Test points awarding
    console.log('Testing points system...');
    
    // Find a test user
    const testUser = await User.findOne();
    if (!testUser) {
        console.log('No users found in database');
        process.exit(0);
    }
    
    console.log('Test user found:', testUser.email);
    console.log('Current points:', testUser.points);
    console.log('Current tier:', testUser.membershipTier);
    
    // Test points awarding
    const testOrderId = new mongoose.Types.ObjectId();
    const testAmount = 50; // $50 order
    
    console.log(`Testing points award for order ${testOrderId} with amount $${testAmount}`);
    
    await awardPointsForOrder(testUser._id, testOrderId, testAmount);
    
    // Check updated user
    const updatedUser = await User.findById(testUser._id);
    console.log('Updated points:', updatedUser.points);
    console.log('Updated tier:', updatedUser.membershipTier);
    console.log('Points history:', updatedUser.pointsHistory.length, 'entries');
    
    console.log('Points system test completed successfully!');
    
} catch (error) {
    console.error('Error testing points system:', error);
} finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
} 