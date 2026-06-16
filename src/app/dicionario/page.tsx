"use client";

import { useState } from "react";
import { getWordList } from "@/services/wordlist";
import { searchWord } from "@/services/dictionary";
import type { WordEntry } from "@/types/dictionary";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { WordDisplay } from "@/components/dictionary/word-display";
import { MeaningCard } from "@/components/dictionary/meaning-card";
import { FavoritesButton } from "@/components/dictionary/favorites-button";
import { Skeleton } from "@/components/ui/skeleton";

const words = getWordList();

export default function DictionaryPage() {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [wordData, setWordData] = useState<WordEntry | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function openModal(word: string) {
    setSelectedWord(word);
    setWordData(null);
    setError(null);
    setLoading(true);

    try {
      const result = await searchWord(word);
      setWordData(result[0]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch word",
      );
    } finally {
      setLoading(false);
    }
  }

  function closeModal() {
    setSelectedWord(null);
    setWordData(null);
    setError(null);
  }

  return (
    <div className="flex flex-1 flex-col px-4 py-8">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight">Dicionário</h1>
        <p className="mt-1 text-muted-foreground">
          Pesquise qualquer palavra em inglês para ver sua definição e pronúncia.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {words.map((word) => (
            <button
              key={word}
              onClick={() => openModal(word)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-left text-sm transition-colors hover:bg-muted"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      <Modal
        open={!!selectedWord}
        onClose={closeModal}
        title={selectedWord ?? undefined}
      >
        {loading && (
          <div className="space-y-4">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-24 w-full" />
          </div>
        )}

        {error && (
          <p className="text-sm text-muted-foreground">{error}</p>
        )}

        {wordData && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{wordData.word}</h2>
                {wordData.phonetic && (
                  <span className="text-sm text-muted-foreground">
                    {wordData.phonetic}
                  </span>
                )}
              </div>
              <FavoritesButton word={wordData} showLabel={false} />
            </div>

            <div className="space-y-3">
              {wordData.meanings.map((meaning, idx) => (
                <MeaningCard key={idx} meaning={meaning} />
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
