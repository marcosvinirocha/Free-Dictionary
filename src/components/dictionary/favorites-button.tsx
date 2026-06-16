"use client";

import { Star } from "lucide-react";
import type { WordEntry } from "@/types/dictionary";
import { useDictionary } from "@/contexts/dictionary-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FavoritesButtonProps {
  word: WordEntry;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function FavoritesButton({
  word,
  size = "md",
  showLabel = true,
}: FavoritesButtonProps) {
  const { isFavorite, addFavorite, removeFavorite } = useDictionary();
  const favorited = isFavorite(word.word);

  function handleToggle() {
    if (favorited) {
      removeFavorite(word.word);
    } else {
      addFavorite(word);
    }
  }

  return (
    <Button
      variant="outline"
      size={size}
      onClick={handleToggle}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
    >
      <Star
        className={cn(
          "h-4 w-4",
          favorited && "fill-yellow-500 text-yellow-500",
        )}
        suppressHydrationWarning
      />
      {showLabel && (favorited ? "Salvado" : "Salvar")}
    </Button>
  );
}
