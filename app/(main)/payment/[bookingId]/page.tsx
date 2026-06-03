import PaymentTemplate from "@/app/components/templates/PaymentTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pembayaran - Travelita",
  description: "Selesaikan pembayaran pesanan Anda.",
};

interface Props {
  params: Promise<{ bookingId: string }>;
}

export default async function Page({ params }: Props) {
  const { bookingId } = await params;
  return <PaymentTemplate bookingId={bookingId} />;
}
