# Crisma de Adultos 2026 — Site dos Encontros

Site interativo para os encontros semanais da Crisma de Adultos da **Paróquia Maria Mãe de Deus**, com formação, leituras bíblicas, reflexões, compromissos da semana e quiz interativo.

---

## ✨ Funcionalidades

- 🏠 **Página inicial** — apresentação, contagem regressiva ao vivo até o próximo sábado, das 17h às 18h
- 📅 **Lista de encontros** — todos os 17 sábados com status (hoje / disponível / realizado / em breve)
- 📖 **Página do encontro** — formação completa em abas:
  - **Formação** — texto catequético dividido em tópicos
  - **Palavra de Deus** — leituras bíblicas propostas
  - **Reflexão** — perguntas para meditar + compromisso da semana com check-in
  - **Para saber mais** — músicas, livros, Catecismo
- 🎯 **Quiz interativo** — 5 perguntas por encontro com feedback imediato, animação de erro/acerto e confetes ao final
- 📊 **Meu progresso** — acompanhamento de encontros visitados, compromissos e média no quiz (salvo no navegador, sem login)

---

## 🎨 Design System

| Elemento | Valor |
|---|---|
| Cor primária | `#C41230` (Vermelho cardinal) |
| Cor secundária | `#B8860B` (Ouro escuro) |
| Acento | `#F5C842` (Ouro claro) |
| Fundo | `#FAFAF8` (Branco creme) |
| Fonte de títulos | Playfair Display |
| Fonte do corpo | Lora |
| Fonte de citações | Cormorant Garamond |

---

## 🛠️ Tecnologias

- **Vite** — ferramenta que monta e serve o projeto
- **React 19** — biblioteca para construir a interface em componentes
- **React Router** — navegação entre páginas
- **Tailwind CSS v4** — estilos com classes prontas
- **Framer Motion** — animações suaves de entrada, transições e quiz
- **canvas-confetti** — confetes ao acertar o quiz
- **localStorage** — para salvar progresso sem precisar de servidor

---

## 🚀 Como rodar

### Pré-requisitos
- Node.js 18 ou superior

### Instalar dependências
```bash
npm install
```

### Rodar em modo de desenvolvimento
```bash
npm run dev
```
Abre em http://localhost:5173

### Gerar build de produção
```bash
npm run build
```
Gera os arquivos finais na pasta `dist/`.

### Pré-visualizar a build de produção
```bash
npm run preview
```

---

## ☁️ Como publicar (deploy)

O site é hospedado no **Cloudflare Pages** (projeto `crismadeadultos` → https://crismadeadultos.pages.dev).

O deploy é automático: cada `git push` na branch `main` dispara o build (`npm run build` → pasta `dist`) e publica o site.

---

## 📂 Estrutura do projeto

```
crisma/
├── public/
│   ├── crisma-capa.png       # Imagem oficial da capa do PDF
│   └── brasao.png            # Brasão da paróquia
├── src/
│   ├── components/
│   │   ├── Header.jsx        # Cabeçalho fixo com navegação
│   │   ├── Footer.jsx        # Rodapé com brasão
│   │   ├── Logo.jsx          # Imagens e ícone do Espírito Santo
│   │   ├── Countdown.jsx     # Contagem regressiva animada
│   │   └── PageTransition.jsx # Animação de troca de páginas
│   ├── data/
│   │   └── encontros.js      # Conteúdo dos encontros e quizzes
│   ├── pages/
│   │   ├── Home.jsx          # Página inicial
│   │   ├── Encontros.jsx     # Lista de encontros
│   │   ├── EncontroDetalhe.jsx # Detalhe com abas
│   │   ├── Quiz.jsx          # Quiz interativo
│   │   └── Progresso.jsx     # Acompanhamento pessoal
│   ├── App.jsx               # Roteamento principal
│   ├── main.jsx              # Ponto de entrada do React
│   └── index.css             # Estilos globais e tema
├── index.html
├── package.json
└── vite.config.js
```

---

## 📝 Como adicionar um novo encontro

Edite o arquivo `src/data/encontros.js` e adicione um novo objeto na lista `encontros`:

```js
{
  id: 2,
  numero: 2,
  titulo: 'Jesus Cristo',
  subtitulo: 'O Filho de Deus',
  data: '2026-05-09',
  versiculoDestaque: '...',
  versiculoRef: 'João 1,14',
  leituras: [
    { ref: 'João 1, 1-18', titulo: 'O Verbo se fez carne' },
  ],
  formacao: [
    { titulo: 'Tema 1', conteudo: 'Texto da formação...' },
  ],
  reflexao: ['Pergunta 1?', 'Pergunta 2?', 'Pergunta 3?'],
  compromisso: 'Compromisso da semana...',
  recursos: [
    { tipo: 'Música', titulo: '...', autor: '...' },
  ],
  quiz: [
    {
      pergunta: 'Sua pergunta aqui?',
      opcoes: ['A', 'B', 'C', 'D'],
      correta: 1,
      explicacao: 'Por que essa é a resposta correta...',
    },
  ],
}
```

O encontro aparece automaticamente na lista, na home e no progresso. ✨

---

## 🤝 Crédito

Conteúdo do Encontro 1 baseado no material oficial da Paróquia Maria Mãe de Deus.

Site desenvolvido com ❤️ para a comunidade.
