'use client';

import { useState } from 'react';
import type { BookingStatus } from '@/app/types/booking';

interface BookingStatusToggleProps {
  onStatusChange?: (status: BookingStatus) => void;
  defaultStatus?: BookingStatus;
  onClick?: () => void;
}

const statuses: Array<{ value: BookingStatus; label: string; dot: string }> = [
  { value: 'PENDING',    label: 'Pending',    dot: 'bg-amber-400' },
  { value: 'CONFIRMED',  label: 'Confirmed',  dot: 'bg-indigo-500' },
  { value: 'PROCESSING', label: 'Processing', dot: 'bg-sky-500' },
  { value: 'COMPLETED',  label: 'Completed',  dot: 'bg-emerald-500' },
];

export default function BookingStatusToggle({
  onStatusChange,
  defaultStatus = 'PENDING',
  onClick,
}: BookingStatusToggleProps) {
  const [activeStatus, setActiveStatus] = useState<BookingStatus>(defaultStatus);

  const handleStatusChange = (status: BookingStatus) => {
    setActiveStatus(status);
    onStatusChange?.(status);
    onClick?.();
  };

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {statuses.map((s) => {
        const isActive = activeStatus === s.value;
        return (
          <button
            key={s.value}
            onClick={() => handleStatusChange(s.value)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              isActive
                ? 'bg-[#1434A4] text-white shadow-md shadow-blue-200'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-white/70' : s.dot}`} />
            {s.label}
          </button>
        );
      })}
    </div>
  );
}