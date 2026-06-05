"use client";

import { MessageCircle, Phone } from "lucide-react";

export default function FloatingButtons() {
  return (
    <>
      <a 
        href="https://wa.me/77776862385" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-8 left-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300"
        aria-label="Написать в WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>

      <a 
        href="tel:+77776862385" 
        className="fixed bottom-8 right-6 z-50 w-14 h-14 bg-[#f99c00] hover:bg-[#e08c00] text-gray-900 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300"
        aria-label="Позвонить нам"
      >
        <Phone className="w-6 h-6 fill-current" />
      </a>
    </>
  );
}