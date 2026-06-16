import type { WordEntry, DictionaryError } from "@/types/dictionary";

const API_BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en";

export async function searchWord(word: string): Promise<WordEntry[]> {
  const response = await fetch(`${API_BASE_URL}/${encodeURIComponent(word)}`);

  if (!response.ok) {
    if (response.status === 404) {
      const error: DictionaryError = await response.json();
      throw new Error(error.message || `Word "${word}" not found`);
    }
    throw new Error("Failed to fetch word definition");
  }

  return response.json();
}
