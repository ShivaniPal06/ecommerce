import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

//config dotenv
//if the dotenv file is not in the root directory, we need to specify the path name
//dotenv.config({ path: 'path_name' }); 

//if the dotenv file is in root directory
dotenv.config();

//database config
connectDB();

//es module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './client/build')));

//routes
// Use the authRoutes for the '/api/v1/auth' endpoint
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);

//rest api
// This is a route handler for the root URL of the application
// app.get('/', (req, res) => {
//     // This line sends a response to the client with a welcome message
//     res.send('<h1>Welcome to E Commerce Website</h1>');
// });
app.use('*', function(req, res){
    res.sendFile(path.join(__dirname, './client/build/index.html'));
})

//PORT
const PORT = process.env.PORT || 8000;

//run listen
// Listen to the specified port and log a message to the console when the server is running
app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});
