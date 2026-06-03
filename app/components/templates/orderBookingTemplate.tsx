"use client";

import OrderBookingCard from "@/app/components/organism/OrderBookingCard";
import BookingStatusToggle from "@/app/components/moleculs/BookingStatusToggle";
import { useEffect, useState } from "react";
import type { BookingListItem } from "@/app/types/booking";
import { getUserBooking } from "@/app/actions/booking";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function OrderBookingTemplate() {
  const t = useTranslations("orders");
  const { data: session } = useSession();
  const [status, setStatus] = useState("PENDING");
  const [data, setData] = useState<BookingListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const userId = session?.user?.id || "";

  const fetchBookings = async (s: string) => {
    if (!userId) return;
    setIsLoading(true);
    try {
      const booking = await getUserBooking(userId, s);
      setData(booking.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchBookings = async (s: string) => {
      if (!userId) return;
      setIsLoading(true);
      try {
        const booking = await getUserBooking(userId, s);
        setData(booking.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookings(status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <main className="min-h-screen w-full bg-slate-50 px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1434A4]">
            {t("sectionLabel")}
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            {t("pageTitle")}
          </h1>
        </div>

        {/* Filter */}
        <BookingStatusToggle
          onStatusChange={(e) => {
            setStatus(e);
            fetchBookings(e);
          }}
        />

        {/* Content */}
        {isLoading ? (
          <div className="space-y-3 mt-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-20 animate-pulse rounded-2xl bg-slate-200"
              />
            ))}
          </div>
        ) : data.length === 0 ? (
          <div className="mt-4 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 text-slate-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z"
                />
              </svg>
            </div>
            <p className="text-sm font-semibold text-slate-600">
              {t("emptyState.title")}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              {t("emptyState.subtext")}
            </p>
          </div>
        ) : (
          <div className="space-y-3 mt-2">
            {data.map((booking) => (
              <OrderBookingCard
                key={booking.id}
                booking={booking}
                shuttleDetail={booking.shuttleBooking ?? null}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
