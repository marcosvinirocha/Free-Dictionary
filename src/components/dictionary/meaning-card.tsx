import type { Meaning } from "@/types/dictionary";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { DefinitionItem } from "./definition-item";

interface MeaningCardProps {
  meaning: Meaning;
}

export function MeaningCard({ meaning }: MeaningCardProps) {
  return (
    <Card>
      <div className="mb-3 flex items-center gap-2">
        <Badge>{meaning.partOfSpeech}</Badge>
        {meaning.synonyms.length > 0 && (
          <span className="text-sm text-muted-foreground">
            Sinonimo: {meaning.synonyms.join(", ")}
          </span>
        )}
      </div>

      <div className="space-y-3">
        {meaning.definitions.map((def, idx) => (
          <DefinitionItem key={idx} definition={def} index={idx + 1} />
        ))}
      </div>

      {meaning.antonyms.length > 0 && (
        <p className="mt-3 text-sm text-muted-foreground">
          Antônimo: {meaning.antonyms.join(", ")}
        </p>
      )}
    </Card>
  );
}
