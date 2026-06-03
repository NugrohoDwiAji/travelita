export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED"
  | "PROCESSING";
type ShuttleType = "ONE_WAY" | "ROUND_TRIP";
export type bookingType =
  | "SHUTTLE"
  | "TRIP"
  | "PRIVATE_CAR"
  | "SPEAR_CAR"
  | "TICKET";

export interface BookingRecord {
  id: string;

  bookingDbId?: number;
  name: string;
  phone: string;
  date: string;
  status: BookingStatus;
  amount: string;

  [key: string]: string | number | undefined;
}

export interface ColumnDef {
  key: keyof ShuttleBookingRecordAdmin;
  label: string;
  className?: string;
  render?: (
    value: string | number | undefined,
    row: BookingRecord,
  ) => React.ReactNode;
}

export interface BookingFormData {
  userId: string;
  details: number;
  type: bookingType;
  status: BookingStatus;
}

export interface BookingTableProps {
  shuttleType: ShuttleType;
  from: string;
  to: string;
  leavingTime: string;
  returnTime?: string;
  passengerCount: number;
  price: string;
  description?: string;
}

export interface ShuttleBookingUserProfile {
  id: string;
  country: string;
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

export interface BookingListItem {
  id: number;
  userId: string;
  details: number;
  phone: string | null;
  type: bookingType;
  status: BookingStatus;
  createdAt?: Date;
  updatedAt?: Date;
  paymentProof: string | null;
  user?: ShuttleBookingUser | null;
  shuttleBooking?: ShuttleBookingDetail | null;
}



export interface ShuttleBookingDetail {
  id: number;
  shuttleType: ShuttleType;
  from: string;
  to: string;
  leavingTime: Date;
  returnTime?: Date | null;
  passengerCount: number;
  price: number;
  description: string | null;
  paymentProof?: string ;
  createdAt: Date;
  updatedAt: Date;
}


export interface ShuttleBookingRecordAdmin{
  id: string;
  bookingId: number;
  name: string;
  phone: string;
  route: string;
  date: string;
  time: string;
  passengers: string;
  amount: string;
  status: BookingStatus;
  paymentProof: string | null;
}

export interface updatePaymentProofPayload {
  bookingId: string;
  paymentProof: File;
}
