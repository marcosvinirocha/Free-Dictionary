"use client";

import Link from "next/link";
import { Star, Trash2, BookOpen } from "lucide-react";
import { useDictionary } from "@/contexts/dictionary-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function FavoritesList() {
  const { favorites, removeFavorite } = useDictionary();

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-16 text-center">
        <Star className="h-10 w-10 text-muted-foreground" suppressHydrationWarning />
        <h2 className="text-lg font-semibold">Nenhum favorito salvo.</h2>
        <p className="text-sm text-muted-foreground">
          Salve as palavras clicando na estrela em quaquer parte da palavra.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {favorites.map((entry) => {
        const firstMeaning = entry.meanings?.[0];
        const firstDef = firstMeaning?.definitions?.[0]?.definition;

        return (
          <Card key={entry.word} className="flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <Link
                  href={`/palavra/${encodeURIComponent(entry.word)}`}
                  className="text-lg font-semibold hover:underline"
                >
                  {entry.word}
                </Link>
                {entry.phonetic && (
                  <span className="text-sm text-muted-foreground">
                    {entry.phonetic}
                  </span>
                )}
              </div>
              {firstMeaning && (
                <Badge variant="secondary" className="mt-1">
                  {firstMeaning.partOfSpeech}
                </Badge>
              )}
              {firstDef && (
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {firstDef}
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeFavorite(entry.word)}
              aria-label={`Remove ${entry.word} from favorites`}
            >
              <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" suppressHydrationWarning />
            </Button>
          </Card>
        );
      })}
    </div>
  );
}
