import { Request, Response } from 'express';
import { db } from '../db';

const findUser = async (req: Request, res: Response) => {
    const { firstName, lastName } = req.query;

    if (!firstName && !lastName) {
        return res.status(400).json({ message: 'First name or Last name is required' });
    }

    try {
        const students = await db.aPUC_studentprofile.findMany({
            where: {
                OR: [
                    firstName ? { FirstName: { contains: firstName as string } } : {},
                    lastName ? { LastName: { contains: lastName as string } } : {}
                ]
            }
        });

        if (students.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ students });
    } catch (error) {
        //res.status(500).json({ message: 'An error occurred while fetching the user', error: error.message });
    }
};

// TODO: Learn about Pagination and apply 
// TODO : Create hostel/admin signup and login api's
export   { findUser };