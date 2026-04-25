import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/app/lib/prisma";
import OrderBookingCard from "@/app/components/organism/OrderBookingCard";

export default async function OrdersPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/signin");
  }

  const booking = await prisma.booking.findUnique({
    where: { userId: session.user.id },
    select: {
      id: true,
      type: true,
      status: true,
      details: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const shuttleDetail =
    booking?.type === "SHUTTLE"
      ? await prisma.shuttleBooking.findUnique({
          where: { id: booking.details },
          select: {
            id: true,
            shuttleType: true,
            from: true,
            to: true,
            leavingTime: true,
            returnTime: true,
            passengerCount: true,
            price: true,
            description: true,
            createdAt: true,
            updatedAt: true,
          },
        })
      : null;

  const totalBiaya = shuttleDetail?.price ?? null;

  return (
    <main className="min-h-screen w-full bg-white px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-4xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1434A4]">
            Riwayat Pemesanan
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">Pesanan Saya</h1>

          {!booking ? (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600">
              Belum ada pesanan untuk akun ini.
            </div>
          ) : (
            <OrderBookingCard booking={booking} totalBiaya={totalBiaya} shuttleDetail={shuttleDetail} />
          )}
        </div>
      </div>
    </main>
  );
}
