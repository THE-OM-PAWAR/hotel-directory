import mongoose from 'mongoose';
import { Hostel } from './hostel.model';
import { Block } from './block.model';
import { HostelProfile } from './hostel-profile.model';
import { BlockProfile } from './block-profile.model';
import { RoomType } from './room-type.model';

// Function to ensure all models are registered
export const registerModels = () => {
  // The models are already registered when imported due to the pattern used in each model file
  // This function ensures they are available by importing them
  return {
    Hostel,
    Block,
    HostelProfile,
    BlockProfile,
    RoomType
  };
};
