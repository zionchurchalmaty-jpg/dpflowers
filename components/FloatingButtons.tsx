"use client";

import { MessageCircle } from "lucide-react";

export default function FloatingButtons() {
  return (
    <a 
      href="https://wa.me/77776862385" 
      target="_blank" 
      rel="noreferrer"
      className="fixed bottom-8 right-6 z-50 w-14 h-14 bg-[#1A3326] hover:bg-[#234433] border border-[#D4AF37]/30 text-white rounded-full flex items-center justify-center shadow-xl hover:-translate-y-1 transition-all duration-300 group"
      aria-label="Связаться в WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-[#D4AF37] group-hover:scale-110 transition-transform" />
      
      <div className="absolute inset-0 bg-[#1A3326] rounded-full -z-10 blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
    </a>
  );
}