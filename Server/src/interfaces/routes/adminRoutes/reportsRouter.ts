import { Request, Response } from "express";
import { getAllReports } from "../../../adapters/repositories/reportPostRepository";



const getReports = async (req: Request, res: Response) => {
    try {

        const result = await getAllReports()
        if (result) {
            res.status(200).json({
                success: true,
                message: 'all reports fetched successfully',
                data: result
            })
        } else {
            res.status(400).json({
                success: true,
                message: 'error fetching all reports',
            })
        }
    } catch (error) {
        res.status(400).json({
            success: true,
            message: 'error fetching all reports',
        })
    }
}



export { getReports }