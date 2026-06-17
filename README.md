# Free Dictionary

Uma aplicação web de dicionário de inglês construída com **Next.js 16** (App Router),
**TypeScript** e **Tailwind CSS v4**. Utiliza a [Free Dictionary API](https://dictionaryapi.dev/)
para consultar definições, fonéticas e exemplos de palavras em inglês.

## Funcionalidades

- **Busca de palavras** — Pesquise qualquer palavra em inglês e veja definições,
  fonética, áudio de pronúncia e exemplos de uso.
- **Favoritos** — Salve palavras nos favoritos (persistido no `localStorage`).
  Gerencie seus favoritos pela página dedicada.
- **Histórico** — Palavras pesquisadas recentemente são salvas automaticamente
  e exibidas na página inicial.
- **Dicionário completo** — Navegue por uma lista de palavras comuns e veja
  detalhes em um modal.
- **Tema claro** — Design limpo e responsivo com suporte a tema claro.
- **Performance** — Server Components, lazy loading e fontes otimizadas com
  `next/font`.

## Deploy

Acesse a aplicação em produção: [freedictionary-mu.vercel.app](https://freedictionary-mu.vercel.app/)

## Stack

| Tecnologia | Versão |
|---|---|
| Next.js | 16 (App Router) |
| React | 19 |
| TypeScript | 5 |
| Tailwind CSS | 4 |
| Lucide React | — |

## Como rodar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Estrutura do Projeto

```
src/
├── app/                    # Rotas (App Router)
│   ├── page.tsx            # Home — busca + histórico
│   ├── palavra/[slug]/     # Detalhes da palavra
│   ├── favoritos/          # Lista de favoritos
│   └── dicionario/         # Lista de palavras + modal
├── components/
│   ├── ui/                 # Button, Input, Card, Badge, Skeleton, Modal
│   ├── layout/             # Header com navegação
│   └── dictionary/         # SearchBar, WordDisplay, FavoritesButton, etc.
├── contexts/               # DictionaryProvider (favoritos + histórico)
├── hooks/                  # useLocalStorage (hydration-safe)
├── services/               # API calls (Free Dictionary API)
└── types/                  # TypeScript interfaces
```

## API

Os dados de palavras são obtidos da [Free Dictionary API](https://dictionaryapi.dev/):

```
GET https://api.dictionaryapi.dev/api/v2/entries/en/{word}
```

## Licença

MIT
