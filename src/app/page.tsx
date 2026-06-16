export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <main className="flex flex-col items-center gap-8 w-full max-w-2xl px-4 py-16">
        <h1 className="text-4xl font-bold tracking-tight">Free Dictionary</h1>
        <p className="text-muted-foreground text-lg text-center">
          Search for any English word to see its definition, phonetics, and examples.
        </p>
      </main>
    </div>
  );
}
