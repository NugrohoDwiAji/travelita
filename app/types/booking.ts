
export type BookingStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "PROCESSING";
type ShuttleType = "ONE_WAY" | "ROUND_TRIP";
type bookingType = "SHUTTLE" | "TRIP" | "PRIVATE_CAR" | "SPEAR_CAR" | "TICKET";

export interface BookingRecord {
  id: string;
  /** ID numerik dari tabel Booking di database. Wajib diisi agar ubah status tersimpan ke DB. */
  bookingDbId?: number;
  name: string;
  phone: string;
  date: string;
  status: BookingStatus;
  amount: string;
  [key: string]: string | number | undefined;
}

export interface ColumnDef {
  key: string;
  label: string;
  className?: string;
  render?: (value: string | number | undefined, row: BookingRecord) => React.ReactNode;
}

export interface BookingFormData {
  userId:string;
  details: number;
  type: bookingType;
  status: BookingStatus;
}

export interface BookingTableProps {
  shuttleType: ShuttleType;
  from:string;
  to:string;
  leavingTime:string;
  returnTime?:string;
  passengerCount:number;
  price:string;
  description?:string;
}

export interface ShuttleBookingUserProfile {
  id: string;
  coutry: string;
  city: string;
  profilePicture: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ShuttleBookingUser {
  id: string;
  name: string;
  username: string;
  email: string;
  role: "USER" | "ADMIN";
  profile: ShuttleBookingUserProfile | null;
}

export interface ShuttleBookingListItem {
  id: number;
  userId: string;
  details: number;
  type: "SHUTTLE";
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
  user: ShuttleBookingUser | null;
}

