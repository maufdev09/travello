import { Request, Response } from 'express';
import { Listing } from '../models/Listing'; // Assuming you have a Listing model

export const getAllListingsPublicController = async (req: Request, res: Response) => {
  try {
    // Fetch listings that are public (assuming 'isActive' or 'isPublic' field)
    const listings = await Listing.find({ isActive: true }).populate('guide', 'name email'); // Adjust fields as needed

    res.status(200).json({
      success: true,
      data: listings,
      message: 'Public listings fetched successfully'
    });
  } catch (error: any) {
    console.error('Error fetching public listings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch public listings',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};