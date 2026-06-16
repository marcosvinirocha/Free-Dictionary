"use client";

import { Play } from "lucide-react";
import type { WordEntry } from "@/types/dictionary";
import { FavoritesButton } from "./favorites-button";

interface WordDisplayProps {
  word: WordEntry;
}

export function WordDisplay({ word }: WordDisplayProps) {
  const audioSrc = word.phonetics?.find((p) => p.audio)?.audio;

  function playAudio() {
    if (audioSrc) {
      new Audio(audioSrc).play();
    }
  }

  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">{word.word}</h1>
        <div className="mt-1 flex items-center gap-2">
          {word.phonetic && (
            <span className="text-lg text-muted-foreground">
              {word.phonetic}
            </span>
          )}
          {audioSrc && (
            <button
              onClick={playAudio}
              className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Listen to pronunciation"
            >
              <Play className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      <FavoritesButton word={word} />
    </div>
  );
}
