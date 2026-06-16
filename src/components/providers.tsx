"use client";

import type { ReactNode } from "react";
import { DictionaryProvider } from "@/contexts/dictionary-context";

export function Providers({ children }: { children: ReactNode }) {
  return <DictionaryProvider>{children}</DictionaryProvider>;
}
