"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { WordEntry } from "@/types/dictionary";
import { searchWord } from "@/services/dictionary";
import { WordDisplay } from "@/components/dictionary/word-display";
import { MeaningCard } from "@/components/dictionary/meaning-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function WordPage({ params }: PageProps) {
  const { slug } = use(params);
  const [data, setData] = useState<WordEntry[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchWord() {
      setLoading(true);
      setError(null);
      try {
        const result = await searchWord(decodeURIComponent(slug));
        if (!cancelled) setData(result);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to fetch word",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchWord();
    return () => { cancelled = true; };
  }, [slug]);

  return (
    <div className="flex flex-1 flex-col px-4 py-8">
      <div className="mx-auto w-full max-w-2xl">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4" suppressHydrationWarning />
            Voltar
          </Button>
        </Link>

        <div className="mt-6">
          {loading && (
            <div className="space-y-4">
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-5 w-32" />
              <div className="mt-6 space-y-4">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-40 w-full" />
              </div>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <p className="text-lg font-medium">Palavra não encontrada</p>
              <p className="text-sm text-muted-foreground">{error}</p>
              <Link href="/">
                <Button variant="outline" size="sm">
                  Tente outra palavra
                </Button>
              </Link>
            </div>
          )}

          {data && data[0] && (
            <div className="space-y-6">
              <WordDisplay word={data[0]} />

              {data[0].origin && (
                <p className="text-sm text-muted-foreground">
                  Origem: {data[0].origin}
                </p>
              )}

              <div className="space-y-4">
                {data[0].meanings.map((meaning, idx) => (
                  <MeaningCard key={idx} meaning={meaning} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
