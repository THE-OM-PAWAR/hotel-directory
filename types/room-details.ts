export interface RoomDetails {
  _id: string;
  name?: string;
  description?: string;
  rent?: number;
  images?: Array<{ url: string; isCover?: boolean }>;
  components: any[];
  hostel: {
    _id: string;
    name: string;
    profile?: any;
  };
  block: {
    _id: string;
    name: string;
    profile?: any;
  };
  [key: string]: any;
}
