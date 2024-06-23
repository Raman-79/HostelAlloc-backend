
import { Request, Response } from 'express';
import { db } from '../db';
import { isServerError } from '../types';
const allocateHostel = async (req: Request, res: Response) => {

    const { studentId, hostelId, wardenName } = req.body;
    const HOSTELID : number = parseInt(hostelId);
    const StudentID : number = parseInt(studentId);
    const Warden: string = wardenName;
    const ReportingTime: Date | null = new Date();

    if (!studentId || !hostelId) {
        return res.status(400).json({ message: 'Student ID and Hostel ID are required' });
    }

    try {
        const student = await db.aPUC_studentprofile.findUnique({
            where: {
                ID: studentId
            }
        });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const hostel = await db.hostel.findUnique({
            where: {
                id: hostelId
            }
        });

        if (!hostel) {
            return res.status(404).json({ message: 'Hostel not found' });
        }

        const allocation = await db.aPUC_studentprofile.update({
            where: {
                ID: StudentID
            },
            data: {
                hostelId: HOSTELID,
                WardenName: Warden,
                ReportingDate: ReportingTime
            }
        });
        
        res.status(201).json({ message: 'Hostel allocated successfully', allocation, ReportingDate: ReportingTime });
    } catch (error) {
        if(isServerError(error))
            res.status(500).json({ message: 'An error occurred while allocating the hostel', error: error.message });
        else 
            res.status(500).json({ message: 'An error occurred while allocating the hostel' });
    }
};

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

const createHostel  = async (req: Request, res: Response) => {
    const { name} = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Name and capacity are required' });
    }

    try {
        const hostel = await db.hostel.create({
            data: {
                name,
            }
        });
        res.status(201).json({ message: 'Hostel created successfully', hostel });
    } catch (error) {
        if(isServerError(error))
            res.status(500).json({ message: 'An error occurred while creating the hostel', error: error.message });
        else 
            res.status(500).json({ message: 'An error occurred while creating the hostel' });
    }
};

export { getAllHostels, allocateHostel, createHostel};