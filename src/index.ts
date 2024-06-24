import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';

// Import routes

import studentRoutes from './routes/student.routes';
import hostelroutes from './routes/hostel.routes';
import cors from 'cors';
const app: Application = express();
 
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/student', studentRoutes);
app.use('/api/v1/hostel',hostelroutes)
app.use('/api/v1/user',studentRoutes);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});