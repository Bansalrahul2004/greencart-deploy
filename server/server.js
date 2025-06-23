import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import connectCloudinary from './configs/cloudinary.js';

const app = express();
const port = process.env.PORT || 4000;

// Connect to database first
await connectDB()
await connectCloudinary()

// Import models after database connection
import './models/index.js';

import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import reviewRouter from './routes/reviewRoute.js';
import pointsRouter from './routes/pointsRoute.js';
import { stripeWebhooks } from './controllers/orderController.js';

// Allow multiple origins
const allowedOrigins = ['http://localhost:5173', '']

app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks)

// Middleware configuration
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));


app.get('/', (req, res) => res.send("API is Working"));
app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/address', addressRouter)
app.use('/api/order', orderRouter)
app.use('/api/review', reviewRouter)
app.use('/api/points', pointsRouter)

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})