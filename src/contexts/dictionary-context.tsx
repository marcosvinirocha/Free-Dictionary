"use client";

import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { WordEntry } from "@/types/dictionary";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface DictionaryContextType {
  favorites: WordEntry[];
  addFavorite: (word: WordEntry) => void;
  removeFavorite: (word: string) => void;
  isFavorite: (word: string) => boolean;
  history: string[];
  addToHistory: (word: string) => void;
  clearHistory: () => void;
}

const DictionaryContext = createContext<DictionaryContextType | null>(null);

const MAX_HISTORY = 20;

export function DictionaryProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [favorites, setFavorites] = useLocalStorage<WordEntry[]>(
    "dictionary-favorites",
    [],
  );
  const [history, setHistory] = useLocalStorage<string[]>(
    "dictionary-history",
    [],
  );

  const addFavorite = useCallback(
    (word: WordEntry) => {
      setFavorites((prev) => {
        if (prev.some((f) => f.word === word.word)) return prev;
        return [word, ...prev];
      });
    },
    [setFavorites],
  );

  const removeFavorite = useCallback(
    (word: string) => {
      setFavorites((prev) => prev.filter((f) => f.word !== word));
    },
    [setFavorites],
  );

  const addToHistory = useCallback(
    (word: string) => {
      setHistory((prev) => {
        const filtered = prev.filter((w) => w !== word);
        return [word, ...filtered].slice(0, MAX_HISTORY);
      });
    },
    [setHistory],
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  return (
    <DictionaryContext.Provider
      value={{
        favorites: mounted ? favorites : [],
        addFavorite,
        removeFavorite,
        isFavorite: (word: string) =>
          (mounted ? favorites : []).some((f) => f.word === word),
        history: mounted ? history : [],
        addToHistory,
        clearHistory,
      }}
    >
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary() {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error("useDictionary must be used within a DictionaryProvider");
  }
  return context;
}
