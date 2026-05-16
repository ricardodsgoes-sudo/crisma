# Crisma de Adultos — Instruções para Claude

## Tarefa recorrente: novo encontro a cada sábado

Todo sábado chega um novo PDF em `public/` com o material do encontro daquela semana.
O PDF contém: oração inicial, palavra de Deus, texto de formação, reflexão, compromisso e recursos.

### Passo a passo para criar um novo encontro

1. **Ler o PDF** em `public/` (o mais recente pela data no nome do arquivo).

2. **Determinar o número do encontro** no calendário do app:
   - O calendário começa em `2026-05-02` (1º sábado) com `numero: 1`.
   - Cada sábado subsequente é `numero + 1`.
   - O PDF pode usar numeração interna diferente (ex.: "Encontro 2 – Deus Filho"), mas no app o número é o do calendário (sábado correspondente).
   - O encontro atual é sempre o sábado mais recente. Use a data do encontro para calcular: `numero = (dias desde 2026-05-02 / 7) + 1`.

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

**Usar SOMENTE as informações que estão explicitamente no PDF.** Não inventar, não complementar, não adicionar leituras, referências, seções ou conteúdo que não esteja escrito no material. Se uma informação não estiver no PDF, não colocar.

### Dicas

- O campo `compromisso` é uma string única (não array). Se o PDF tiver jaculatória + lista de ações, combine tudo em uma ou duas frases.
- O `versiculoDestaque` vem da seção "Meditando a Palavra" ou do versículo principal do PDF.
- Para as `leituras`, sempre inclua a referência citada no PDF e adicione uma segunda leitura temática complementar.
- O quiz deve ter exatamente 5 questões com 4 opções cada. As respostas corretas não devem ficar sempre no mesmo índice.
- Insira o novo objeto **no início** do array `encontros` (antes do encontro anterior), para que a listagem mostre o mais recente primeiro internamente.

## Após cada modificação

Sempre rodar `npm run dev` para subir o servidor de desenvolvimento em http://localhost:5173 (as alterações aparecem automaticamente).

## Estrutura do projeto

- `src/data/encontros.js` — dados de todos os encontros + funções do calendário
- `src/pages/EncontroDetalhe.jsx` — página de detalhe (lê os dados; não precisa alterar)
- `src/pages/Quiz.jsx` — quiz (lê os dados; não precisa alterar)
- `public/` — PDFs dos encontros (referência de leitura, não servidos como assets)
