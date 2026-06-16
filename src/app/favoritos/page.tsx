"use client";

import { FavoritesList } from "@/components/dictionary/favorites-list";

export default function FavoritesPage() {
  return (
    <div className="flex flex-1 flex-col px-4 py-8">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight">Favoritos</h1>
        <p className="mt-1 text-muted-foreground">
          Palavras salvos na ultima referência.
        </p>

        <div className="mt-6">
          <FavoritesList />
        </div>
      </div>
    </div>
  );
}
