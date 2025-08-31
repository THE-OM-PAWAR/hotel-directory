import { IRoomType } from '@/lib/mongoose/models/room-type.model';
import { IBlockProfile } from '@/lib/mongoose/models/block-profile.model';
import { IHostelProfile } from '@/lib/mongoose/models/hostel-profile.model';

export interface IRoomWithDetails extends IRoomType {
  _id: string;
  hostel: {
    _id: string;
    name: string;
    profile?: IHostelProfile;
  };
  block: {
    _id: string;
    name: string;
    profile?: IBlockProfile;
  };
}

export interface IHostelWithBlocks {
  _id: string;
  name: string;
  profile?: IHostelProfile;
  blocks: Array<{
    _id: string;
    name: string;
    profile?: IBlockProfile;
    roomTypes: IRoomType[];
  }>;
}