import { NextResponse } from "next/server";
import type { ApiErrorResponse, ApiResponse } from "../types/api-response";

// Fungsi untuk Respon Sukses (200, 201)
export function successResponse<T>(data: T, message?: string) {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message,
  };
  return NextResponse.json(response);
}

// Fungsi untuk Respon Gagal (400, 404, 500)
export function errorResponse(message: string = "Internal Server Error", statusCode: number = 500, errorDetails?: unknown) {
  const response: ApiErrorResponse = {
    success: false,
    message: message,
    ...(errorDetails && { error: errorDetails }), // Masukkan detail error jika ada
  };
  return NextResponse.json(response, { status: statusCode });
}
