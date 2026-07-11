# Crisma de Adultos — Instruções para Claude

## Tarefa recorrente: novo encontro a cada sábado

Todo sábado chega um novo PDF em `docs/pdfs/` com o material do encontro daquela semana.
(Se o usuário colocar o PDF em `public/` por costume, mova-o para `docs/pdfs/` — PDFs em
`public/` são publicados no site e incham o deploy.)
O PDF contém: oração inicial, palavra de Deus, texto de formação, reflexão, compromisso e recursos.

### Passo a passo para criar um novo encontro

1. **Ler o PDF** em `docs/pdfs/` (o mais recente pela data no nome do arquivo).

2. **Determinar o número do encontro** no calendário do app:
   - O calendário começa em `2026-05-02` (1º sábado) com `numero: 1`.
   - Cada sábado subsequente é `numero + 1`.
   - **Sábados sem encontro NÃO contam.** Eles estão listados em `SABADOS_SEM_ENCONTRO` em `src/data/encontros.js` (ex.: `2026-05-30` não teve encontro). A sequência os "pula": os encontros seguintes avançam uma semana.
   - O PDF pode usar numeração interna diferente (ex.: "Encontro 2 – Deus Filho"), mas no app o número é o do calendário (sábado correspondente).
   - O encontro atual é sempre o sábado mais recente. Para achar o número, use a função `gerarCalendarioEncontros()` (que já desconta os sábados sem encontro) e localize a data do encontro na lista — o `numero` dela é o número correto. Não use a fórmula simples `dias / 7` sozinha, pois ela ignora os sábados pulados.

3. **Extrair os dados** do PDF e montar o objeto no padrão abaixo.

4. **Inserir no início** do array `encontros` em `src/data/encontros.js` (o mais novo fica primeiro).

5. **Criar 5 perguntas de quiz** baseadas no conteúdo de formação do PDF.

### Estrutura do objeto encontro

```js
{
  id: <numero>,
  numero: <numero>,              // número do sábado no calendário
  titulo: '<Tema>',              // ex.: 'Deus Filho'
  subtitulo: '<Subtítulo>',      // frase que resume o encontro
  data: '<YYYY-MM-DD>',          // data do sábado correspondente
  versiculoDestaque: '<texto>',  // versículo principal do PDF
  versiculoRef: '<Livro X,Y>',   // referência do versículo
  leituras: [
    { ref: '<Livro X, Y-Z>', titulo: '<Título da pericope>' },
    // incluir apenas as leituras explicitamente citadas no PDF
  ],
  formacao: [
    { titulo: '<Subtítulo da seção>', conteudo: '<texto completo...>' },
    // uma entrada por seção/tópico do PDF; use \n\n para parágrafos
  ],
  reflexao: [
    '<Pergunta 1>',
    // todas as perguntas listadas na seção "Para Reflexão" do PDF
  ],
  compromisso: '<texto>',        // jaculatória + ações semanais em uma frase
  imagem: '/<nome-do-arquivo>',    // imagem que o usuário coloca em public/ — usar o nome exato do arquivo
  musica: {                        // incluir SE o PDF trouxer a letra da música
    titulo: '<Título da música>',
    letra: `<letra completa, com estrofes separadas por linha em branco>`,
  },
  recursos: [
    { tipo: 'Música', titulo: '<título>', autor: '<artista>' },
    { tipo: 'Bíblia', titulo: '<livro e capítulo>' },
    { tipo: 'Catecismo', titulo: '<seção>' },
    { tipo: 'Livro', titulo: '<título e páginas>', autor: '<autor>' },
  ],
  quiz: [
    {
      pergunta: '<pergunta>',
      opcoes: ['<A>', '<B>', '<C>', '<D>'],
      correta: <índice 0-3>,
      explicacao: '<explicação da resposta correta>',
    },
    // 5 perguntas no total, extraídas do conteúdo de formação
  ],
}
```

### Regra fundamental

A regra tem **dois lados** e ambos valem sempre:

1. **Usar SOMENTE as informações que estão no PDF.** Não inventar, não complementar, não adicionar leituras, referências, seções ou conteúdo que não esteja escrito no material. Se uma informação não estiver no PDF, não colocar.

2. **Incluir TODAS as informações do PDF na página — nunca esconder ou omitir nada.** Todo conteúdo do PDF deve aparecer no app: motivação, textos de formação, citações e frases de destaque, jaculatórias, reflexão, compromisso, música, recursos, oração final, etc. O trabalho é **adaptar** cada trecho ao formato da página (seção de formação, destaque em negrito, campo próprio), não filtrar o que entra. Se estiver no PDF, tem que estar na página. Na dúvida sobre onde encaixar um trecho, incluir mesmo assim (adaptado) e, se necessário, perguntar o local — nunca simplesmente deixar de fora.

Destaques em negrito do PDF: marcar com `**texto**` no `conteudo` (o componente `EncontroDetalhe.jsx` interpreta e renderiza em negrito, na mesma linha).

### Dicas

- O campo `compromisso` é uma string única (não array). Se o PDF tiver jaculatória + lista de ações, combine tudo em uma ou duas frases.
- O `versiculoDestaque` vem da seção "Meditando a Palavra" ou do versículo principal do PDF.
- Para as `leituras`, inclua apenas as referências realmente citadas no PDF (não adicionar leitura complementar que não esteja no material).
- O quiz deve ter exatamente 5 questões com 4 opções cada. As respostas corretas não devem ficar sempre no mesmo índice.
- Insira o novo objeto **no início** do array `encontros` (antes do encontro anterior), para que a listagem mostre o mais recente primeiro internamente.

## Após cada modificação

Sempre rodar `npm run dev` para subir o servidor de desenvolvimento em http://localhost:5173 (as alterações aparecem automaticamente).

## Hospedagem (Cloudflare é o padrão)

**O projeto é hospedado no Cloudflare** — esse é o host padrão. Sempre que
houver necessidade de infraestrutura (backend, tempo real, armazenamento,
funções), pensar primeiro em soluções Cloudflare (Workers, Durable Objects,
Pages, KV, D1, R2).

- **Frontend:** Cloudflare Pages, projeto `crismadeadultos` → `crismadeadultos.pages.dev` (build do git, `npm run build` → `dist/`). Também há um deploy espelho no Netlify.
- **Backend de presença:** Worker `crisma-presenca` em `worker/` (Durable Object com WebSocket Hibernation) que conta pessoas online em tempo real. URL: `https://crisma-presenca.goesdev.workers.dev` (o subdomínio da conta é `goesdev`; a URL do frontend fica em `src/components/OnlineCounter.jsx`). Deploy: `cd worker && npx wrangler deploy`. Plano gratuito.

## Estrutura do projeto

- `src/data/encontros.js` — dados de todos os encontros + funções do calendário
- `src/pages/EncontroDetalhe.jsx` — página de detalhe (lê os dados; não precisa alterar)
- `src/pages/Quiz.jsx` — quiz (lê os dados; não precisa alterar)
- `src/components/OnlineCounter.jsx` — contador de pessoas online (rodapé), conecta no Worker de presença
- `public/` — imagens e assets publicados no site (preferir WebP; PNG/JPG pesados entram no precache do PWA)
- `docs/pdfs/` — PDFs dos encontros (referência de leitura; ficam fora de `public/` para não serem publicados)
- `worker/` — Worker Cloudflare de presença (Durable Object); deploy independente do frontend
