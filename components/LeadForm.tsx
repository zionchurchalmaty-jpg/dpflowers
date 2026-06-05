"use client";

import { useState } from "react";
import { saveLead } from "@/lib/firestore/client-content";
import { Loader2 } from "lucide-react";

export function LeadForm({
  variant = "default",
}: {
  variant?: "default" | "dark";
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      message: (formData.get("message") as string) || "",
    };

    try {
      await saveLead(data);
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      alert("Ошибка отправки, попробуйте снова.");
    } finally {
      setLoading(false);
    }
  };

  if (success)
    return (
      <p className="text-[#f99c00] font-bold py-10 text-center">
        Спасибо! Мы свяжемся с вами в ближайшее время.
      </p>
    );

  const inputClass =
    variant === "dark"
      ? "w-full bg-[#2A3245] border border-gray-700 text-white px-5 py-4 rounded-md focus:outline-none focus:border-[#f99c00]"
      : "w-full bg-[#1C2331] border border-gray-800 text-white placeholder-gray-600 px-5 py-3.5 rounded-md focus:outline-none focus:border-[#f99c00] text-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        type="text"
        placeholder="Имя *"
        required
        className={inputClass}
      />
      <input
        name="phone"
        type="tel"
        placeholder="Телефон *"
        required
        pattern="^\+?[0-9\s\-]{7,15}$"
        title="Введите корректный номер телефона"
        className={inputClass}
      />
      {variant === "default" && (
        <textarea
          name="message"
          placeholder="Сообщение"
          rows={3}
          className={inputClass}
        />
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#f99c00] hover:bg-[#e08c00] text-gray-900 font-bold px-8 py-3.5 rounded-md transition-colors"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin mx-auto" />
        ) : (
          "Отправить заявку"
        )}
      </button>
    </form>
  );
}
