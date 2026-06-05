"use client";

import { useState } from "react";
import { Phone, User } from "lucide-react";
import { markLeadAsRead } from "@/lib/firestore/client-content";

export function LeadsList({ leads = [] }: { leads?: any[] }) {
  const [localLeads, setLocalLeads] = useState(leads);

  if (!localLeads || localLeads.length === 0) {
    return <p className="text-gray-500 text-sm p-4">Пока новых заявок нет.</p>;
  }

  const handleToggleRead = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "read" ? "new" : "read";
    try {
      await markLeadAsRead(id);
      setLocalLeads(prev => prev.map(l => l.id === id ? { ...l, status: "read" } : l));
    } catch (e) {
      console.error("Ошибка при обновлении статуса:", e);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 font-bold text-gray-900">Последние заявки</div>
      <div className="divide-y divide-gray-100">
        {localLeads.map((lead: any) => (
          <div key={lead.id} className={`p-4 transition-colors ${lead.status === 'read' ? 'bg-gray-50/50' : 'bg-white'}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox"
                  checked={lead.status === 'read'}
                  onChange={() => handleToggleRead(lead.id, lead.status)}
                  className="w-5 h-5 rounded border-gray-300 text-[#f99c00] focus:ring-[#f99c00] cursor-pointer"
                />
                
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <p className={`text-sm font-bold ${lead.status === 'read' ? 'text-gray-500' : 'text-gray-900'}`}>
                    {lead.name}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <Phone className="w-3 h-3" /> {lead.phone}
                  </p>
                </div>
              </div>

              {lead.status !== "read" && (
                <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
                  Новая
                </span>
              )}
            </div>
            {lead.message && (
              <div className={`mt-3 p-3 rounded-md text-xs border ${lead.status === 'read' ? 'bg-white text-gray-400 border-gray-100' : 'bg-gray-50 text-gray-600 border-gray-100'} italic`}>
                {lead.message}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}