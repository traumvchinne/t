export interface Booking {
  id: string;
  roomId: number;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  userId: string;
  userName: string;
}

export interface User {
  username: string;
  role: 'admin' | 'guest';
}

export interface Room {
  id: number;
  name: string;
}