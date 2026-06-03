import type { ApiErrorResponse, ApiResponse } from "../types/api-response";

// Fungsi untuk Respon Sukses di Server Action
export function successResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
  };
}

// Fungsi untuk Respon Gagal di Server Action
export function errorResponse(
  message: string = "Internal Server Error", 
  statusCode: number = 500, 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorDetails?: any
): ApiErrorResponse & { statusCode: number } {
  return {
    success: false,
    message: message,
    statusCode: statusCode, 
    // 🛡️ PERTAHANAN TAMBAHAN: Ekstrak pesannya saja jika itu objek Error Prisma
    error: errorDetails instanceof Error ? errorDetails.message : (typeof errorDetails === "string" ? errorDetails : undefined),
  };
}