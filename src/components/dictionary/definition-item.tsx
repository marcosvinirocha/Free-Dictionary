import type { Definition } from "@/types/dictionary";

interface DefinitionItemProps {
  definition: Definition;
  index: number;
}

export function DefinitionItem({ definition, index }: DefinitionItemProps) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
        {index}
      </span>
      <div>
        <p className="text-sm leading-relaxed">{definition.definition}</p>
        {definition.example && (
          <p className="mt-1 text-sm italic text-muted-foreground">
            &ldquo;{definition.example}&rdquo;
          </p>
        )}
      </div>
    </div>
  );
}
