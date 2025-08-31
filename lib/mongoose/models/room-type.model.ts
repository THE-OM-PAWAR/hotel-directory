import mongoose, { Document, Model } from 'mongoose';

interface RoomTypeImage {
  url: string;
  title: string;
  isCover: boolean;
}

export interface IRoomType extends Document {
  name: string;
  description: string;
  components: mongoose.Types.ObjectId[];
  rent: number;
  blockId: string;
  images: RoomTypeImage[];
  createdAt: Date;
  updatedAt: Date;
}

// Create schema without TypeScript generics to avoid union type complexity
const roomTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  components: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoomComponent',
  }],
  rent: {
    type: Number,
    required: true,
    min: 0,
  },
  blockId: {
    type: String,
    required: true,
  },
  images: [{
    url: String,
    title: String,
    isCover: Boolean,
  }],
}, {
  timestamps: true,
});

export const RoomType = (mongoose.models.RoomType as Model<IRoomType>) ||
  mongoose.model<IRoomType>('RoomType', roomTypeSchema);