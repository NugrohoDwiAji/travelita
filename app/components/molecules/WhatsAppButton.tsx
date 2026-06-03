"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phoneNumber = "6285338740431"; // Ganti dengan nomor WhatsApp Anda
  const waLink = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-110"
      title="Chat dengan kami di WhatsApp"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={28} strokeWidth={1.5} />
    </a>
  );
}
