"use client";

import { usePathname } from "next/navigation";
import FloatingButtons from "./FloatingButtons";

export default function ConditionalFloatingButtons() {
  const pathname = usePathname();

  if (pathname?.includes("/admin")) return null;

  return <FloatingButtons />;
}
