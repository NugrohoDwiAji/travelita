import { BookingStatus } from "@/app/types/booking";

export const STATUS_STYLES: Record<BookingStatus, { bg: string; color: string; label: string }> = {
  PENDING:    { bg: "rgba(245,158,11,0.12)", color: "#d97706", label: "Menunggu"     },
  CONFIRMED:  { bg: "rgba(59,130,246,0.12)", color: "#2563eb", label: "Dikonfirmasi" },
  COMPLETED:  { bg: "rgba(34,197,94,0.12)",  color: "#16a34a", label: "Selesai"      },
  CANCELLED:  { bg: "rgba(239,68,68,0.12)",  color: "#dc2626", label: "Dibatalkan"   },
  PROCESSING: { bg: "rgba(168,85,247,0.12)", color: "#9333ea", label: "Diproses"     },
};

export const STATUS_OPTIONS: BookingStatus[] = [
  "PENDING",
  "PROCESSING",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
];

export function normalizeStatus(status: string): BookingStatus {
  const upper = status.toUpperCase();
  if (upper in STATUS_STYLES) return upper as BookingStatus;
  return "PENDING";
}
