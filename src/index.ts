import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';

// Import routes
import userRoutes from './routes/user';
import hostelroutes from './routes/hostel';
import cors from 'cors';
const app: Application = express();
 
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/hostel',hostelroutes)
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});