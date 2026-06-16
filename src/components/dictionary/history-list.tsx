"use client";

import Link from "next/link";
import { Clock, Trash2 } from "lucide-react";
import { useDictionary } from "@/contexts/dictionary-context";
import { Button } from "@/components/ui/button";

export function HistoryList() {
  const { history, clearHistory } = useDictionary();

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-8 text-center">
        <Clock className="h-8 w-8 text-muted-foreground" suppressHydrationWarning />
        <p className="text-sm text-muted-foreground">
          Nenhuma palavra pesquisada ainda.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Clock className="h-4 w-4" suppressHydrationWarning />
          Pesquisas recentes
        </h2>
        <Button variant="ghost" size="sm" onClick={clearHistory}>
          <Trash2 className="h-3 w-3" suppressHydrationWarning />
          Limpar
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.map((word) => (
          <Link
            key={word}
            href={`/palavra/${encodeURIComponent(word)}`}
            className="rounded-full border border-border bg-muted px-3 py-1 text-sm text-muted-foreground transition-colors hover:bg-border hover:text-foreground"
          >
            {word}
          </Link>
        ))}
      </div>
    </div>
  );
}
