"use client";

import { SearchBar } from "@/components/dictionary/search-bar";
import { HistoryList } from "@/components/dictionary/history-list";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-12">
      <div className="flex w-full max-w-xl flex-col items-center gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Free Dictionary</h1>
          <p className="mt-2 text-muted-foreground">
            Pesquise qualquer palavra em Inglês e vê seu significado e pronunciação.
          </p>
        </div>

        <SearchBar />
        <HistoryList />
      </div>
    </div>
  );
}
