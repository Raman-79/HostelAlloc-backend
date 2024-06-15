
import { Request, Response } from 'express';
import { db } from '../db';
import { isServerError } from '../types';



const getAllHostels = async (req: Request, res: Response) => {
    try {
        const hostels = await db.hostel.findMany();
        res.status(200).json({ hostels });
    } catch (error) {
        if(isServerError(error)) 
         res.status(500).json({ message: 'An error occurred while fetching the hostels', error: error.message });
        else 
         res.status(500).json({ message: 'An error occurred while fetching the hostels' });
    }
};

export { getAllHostels};