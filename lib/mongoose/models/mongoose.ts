import mongoose from 'mongoose';
import { Hostel } from './hostel.model';
import { RoomType } from './room-type.model';
import { Block } from './block.model';
import { HostelProfile } from './hostel-profile.model';
import { BlockProfile } from './block-profile.model';

// Function to ensure all models are registered
export const registerModels = () => {
  // Just importing the models will register them with mongoose
  return {
    Hostel,
    RoomType,
    Block,
    HostelProfile,
    BlockProfile
  };
};
