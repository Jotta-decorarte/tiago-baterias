# Transferência do projeto — Tiago Baterias Delivery

Documento de continuidade para importar em outra conta do ChatGPT. Elaborado em 30/09/2026 a partir do histórico e da leitura dos arquivos locais. Não contém senhas, tokens ou credenciais. A publicação online não foi verificada novamente nesta entrega.

## 1. Instruções para a próxima conversa

Você está assumindo um projeto existente, não criando um site do zero. Preserve o layout e as decisões abaixo. Antes de modificar, leia os arquivos atuais do repositório e confira o estado do Git. Diferencie o que está implementado do que está apenas preparado. Não invente avaliações, IDs de rastreamento, endereços ou resultados de testes. O usuário prefere comunicação simples em português e execução de ajustes diretamente quando autorizados.

Este Markdown transmite o contexto, mas não substitui os arquivos do projeto, as imagens ou o acesso às contas. Para continuar, clone o GitHub ou anexe a pasta do projeto. A nova conta precisa de suas próprias autorizações para GitHub e Vercel.

## 2. Identificação, caminhos e publicação

- Empresa: Tiago Baterias Delivery.
- Agência: Agência GPV — https://agenciagpv.online.
- GitHub: https://github.com/Jotta-decorarte/tiago-baterias.
- Remote: https://github.com/Jotta-decorarte/tiago-baterias.git.
- Branch de trabalho/publicação: `main`.
- Hospedagem: Vercel, conectada ao GitHub; os pushes geram deploys automáticos conforme a configuração existente.
- URL publicada informada no histórico: https://tiago-baterias.vercel.app.
- Domínio configurado nos metadados: https://tiagobaterias.com.br. Não há confirmação neste documento de que tenha sido conectado à Vercel ou pertença ao cliente; validar antes de usar como canonical definitivo.
- Pasta base Windows: `C:\Users\kakac\OneDrive\Documentos\SITE TIAGO BATERIAS`.
- Aplicação Next.js: `C:\Users\kakac\OneDrive\Documentos\SITE TIAGO BATERIAS\tiago-baterias`.
- Último commit local observado: `b14ab84` — design: secao como-funciona cinza claro, cta cinza medio, logos maiores na faixa.
- Commits anteriores: `1415239` (botões responsivos) e `c228f59` (Instagram com iframe).
- Não apareceram alterações locais no status consultado, com avisos de acesso do usuário sandbox. A sincronização remota não foi revalidada.

## 3. Dados comerciais

- WhatsApp: **(21) 98732-3958**.
- Número internacional: `5521987323958`.
- Instagram: https://instagram.com/tiagobaterias.
- Facebook: https://facebook.com/share/18saCzrpKQ.
- Link Google cadastrado: https://g.page/r/CXyP6qlbfW_jEA0/review. É um link de avaliação; validar se é adequado para o CTA de leitura de todas as avaliações.
- Loja Anchieta: **Av. Chrisóstomo Pimentel de Oliveira, 547 - Anchieta, Rio de Janeiro - RJ, 21645-521**.
- Loja Nilópolis: **R. Ver. José Fortes, 365 - Centro, Nilópolis - RJ, 26535-670**.
- Horários fornecidos: segunda a sexta, 8h às 18h; sábado, 8h às 16h; domingos e feriados, horário reduzido. Confirmar se iguais nas duas unidades.
- Oferta: entrega e instalação em até 60 minutos; Nilópolis, Mesquita, Anchieta e região; raio de até 7 km; atendimento 7 dias por semana.
- Produtos: carro passeio (SLI/EFB/AGM), moto, caminhão/van, elétrico/nobreak. Preços anunciados a partir de R$160 para carro e moto; demais sob consulta. Validar atualidade antes de campanhas.
- Diferenciais: testes antes da instalação, bateria recomendada pelo fabricante, instalação inclusa, atendimento no local, tecnologias SLI/EFB/AGM.

## 4. Materiais originais

Na pasta base estão:

- `copy-tiago-baterias.md`: copy original; inicialmente foi solicitado usar os textos exatamente, sem alterar palavras. Ajustes posteriores de botões e layout foram autorizados.
- `design-system-tiago-baterias.md` e `design-system-tiago-baterias (1).md`: referências de design. Comparar ambas antes de alterações relevantes.
- `modelo-site-behance.webp`: referência visual.
- `index.html`: versão inicial em arquivo único; **não é a aplicação atualmente publicada**. Não editar apenas este arquivo esperando atualizar a Vercel.
- Imagens originais das baterias e lojas.

Esses materiais da pasta externa não necessariamente estão no repositório, que foi iniciado dentro de `tiago-baterias`. Levar esses três Markdown e a referência visual para a nova conta junto com este documento.

Houve tentativa de importar um design em `https://api.anthropic.com/v1/design/h/EmB64WR8_-BG65OuJ1gNyw?open_file=index.html`, mas o acesso falhou. Não considerar esse design como lido ou importado com sucesso.

## 5. Stack e organização

- Next.js **14.2.5**, React/React DOM **^18**, TypeScript **^5**.
- GSAP **^3.12.5**, `@gsap/react` **^2.1.1**.
- ESLint **^8**, eslint-config-next **14.2.5**.
- App Router; alias de imports `@/`.
- CSS global + estilos locais/inline; sem Tailwind.
- Fontes via `next/font/google`: Barlow Condensed, Barlow e Inter.
- `next.config.js`: historicamente `reactStrictMode: false` e `images.unoptimized: true`; conferir antes de mudar.
- Dependências externas existem na versão atual: Next/React/GSAP, fontes no build, embeds Instagram/Maps e scripts de marketing. A exigência inicial de arquivo único sem dependências foi substituída pela migração autorizada para Next.js.

```text
tiago-baterias/
  app/
    layout.tsx       # SEO, fontes, Schema.org, scripts de marketing
    page.tsx         # composição da página e duas faixas CTA
    globals.css      # design system, botões, responsividade
  components/
    Navbar.tsx
    Hero.tsx
    BrandStrip.tsx
    HowItWorks.tsx
    Catalog.tsx
    CTABanner.tsx
    Differentials.tsx
    Reviews.tsx
    FAQ.tsx
    Instagram.tsx
    LeadForm.tsx
    Location.tsx
    Footer.tsx
    FloatingWhatsApp.tsx
  lib/constants.ts  # contatos e gerador de links WhatsApp
  public/           # fotos e imagens de marcas
  package.json
  package-lock.json
  next.config.js
  tsconfig.json
  .eslintrc.json
  .gitignore
```

## 6. Layout atual e decisões do cliente

Ordem: Navbar → Hero → faixa de marcas → Como funciona → CTA 1 → Catálogo → Diferenciais → CTA 2 → Avaliações → FAQ → Instagram → Lista VIP → Localização → Footer. WhatsApp flutuante acompanha a navegação.

### Hero

- Fundo real `loja-hero.png`, com overlay para legibilidade.
- Movimento lento de zoom in/out (Ken Burns) aprovado.
- **Não recolocar raios decorativos pulando ou animações de entrada no título.** O cliente achou os raios feios e o título desaparecia após um flash.
- Título deve estar visível imediatamente, sem depender do GSAP.
- Botões com textos compactos: Pedir pelo WhatsApp / Ver catálogo, conforme a versão atual.

### Faixa de baterias/marcas

- Mostrar apenas imagens existentes, nas cores originais.
- Não usar silhuetas, `brightness(0)` ou texto substituindo marcas sem imagem.
- Imagens: Moura, Heliar, Baterax, Zetta, Kondor, ACDelco e Bosch.
- Último ajuste: imagens com altura de 54 px, maiores que os 36 px anteriores. Conferir comportamento desktop/mobile antes de novos ajustes.
- Faixa amarela com movimento horizontal contínuo.

### Seções claras

- Como funciona / “Simples, rápido e sem complicação”: fundo `#F5F5F5`, cards brancos e textos escuros.
- CTA abaixo / “Precisa de uma bateria agora?”: variante `light-gray`, fundo `#E0E0E0`.
- FAQ e Lista VIP: fundo claro `#F5F5F5`.
- Demais áreas mantêm contraste escuro/amarelo. Cliente considera o site excessivamente escuro; conservar os destaques claros.

### FAQ e Lista VIP

- FAQ em gavetas/accordion, seta e clique para abrir/fechar; inclui terminologia de baterias como CCA, AGM, EFB e Start-Stop. Ler `FAQ.tsx` para conteúdo exato.
- Lista VIP continua no lugar original, mas em bloco compacto abre/fecha, não seção alta com formulário sempre exposto.
- Quatro campos em duas linhas: Nome + Telefone; E-mail + Modelo do carro.
- Formulário valida no navegador e abre WhatsApp com os dados. Não existe backend confirmado, banco de leads ou entrega automática de e-mail.
- A mensagem visual de sucesso não comprova envio: abrir WhatsApp não equivale a enviar a mensagem nem a concluir cadastro. Validar essa experiência em trabalhos futuros.

### Instagram

- Botão com gradiente oficial/inspirado nas cores Instagram.
- Carrossel com setas no desktop e intenção de swipe mobile.
- Implementação atual usa iframe direto `https://www.instagram.com/p/ID/embed/`, não plugin contratado nem API de feed.
- Cinco posts fixos, não os últimos cinco atualizados automaticamente:
  1. https://www.instagram.com/p/DZ8BygTRDZ8/
  2. https://www.instagram.com/p/DZX8Fc4R7U8/
  3. https://www.instagram.com/p/DX1sfx3DZfg/
  4. https://www.instagram.com/p/DUdhfYtDV8j/
  5. https://www.instagram.com/p/DWLvijhjZ54/
- O antigo `blockquote + embed.js` apresentou bug ao trocar post; foi substituído por iframe no commit `c228f59`.
- Verificar navegação dos dots: código observado chama avanço/recuo de um slide em vez de selecionar diretamente o índice clicado.
- Swipe sobre o conteúdo de iframe de outro domínio pode não alcançar handlers do elemento pai; testar em celular real. Embeds podem depender de cookies, políticas ou disponibilidade do Instagram.

### Localização e rodapé

- Dois blocos completos: endereço, foto e Google Maps de cada unidade.
- Lado a lado no PC, empilhados no celular.
- Fotos correspondentes `loja-anchieta.png` e `loja-nilopolis.png`.
- WhatsApp com ícone **e número visível**, não apenas ícone.
- Rodapé com crédito/link para Agência GPV: https://agenciagpv.online.

### Responsividade e acessibilidade

- Mobile-first; briefing original: mobile <768 px, tablet e desktop.
- Correção específica de botões para <600 px: empilhados, centralizados, padding/fonte reduzidos, sem overflow lateral.
- Texto do botão preferencialmente em uma linha legível, sem ultrapassar a tela.
- Manter HTML semântico, alt nas imagens, foco de teclado, rótulos, contraste AA e alvos de toque mínimos de 44 px.
- Verificar `prefers-reduced-motion` em todas as animações, inclusive GSAP e faixa; não assumir conformidade só por haver regra CSS.

## 7. Design system resumido

- Preto principal `#0A0A0A`; cards `#111111`; alternativo `#1E1E1E`.
- Amarelo `#F5C518`; hover `#C49B0A`; suave `#FFF3B0`.
- Branco `#FFFFFF`; texto secundário `#E5E5E5`; suporte `#888780`.
- WhatsApp `#25D366`, hover `#128C7E`; erro `#E24B4A`.
- Fundos claros autorizados: `#F5F5F5` e `#E0E0E0`.
- Barlow Condensed para display, Barlow para títulos e Inter para corpo/UI, conforme regras efetivamente presentes no CSS.
- Escala de espaços: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px.
- Container 1200 px; padding horizontal normalmente 24 px / 32 px.
- Radius: 4, 8, 12, 16 px; pill para elementos apropriados.
- Seções originalmente 64 px mobile / 96 px desktop, com ajustes locais posteriores.

## 8. Assets disponíveis em public

`acdelco.png`, `baterax.png`, `bosch.png`, `heliar.png`, `kondor.png`, `moura.png`, `zetta-B.png`, `logo-tiago-baterias.png`, `logo.webp`, `logo2.webp`, `loja-anchieta.png`, `loja-hero.png`, `loja-nilopolis.png`.

Não renomear sem atualizar referências. As imagens de loja foram copiadas da pasta base para `public` para serem publicadas. `og-image.jpg`, embora referenciado no SEO, não estava na listagem de `public` consultada.

## 9. WhatsApp, UTMs, GTM e Pixel — estado real

Função em `lib/constants.ts`:

```ts
export const WPP_NUMBER = '5521987323958'
export function wppLink(msg: string, utmMedium: string) {
  const text = encodeURIComponent(msg)
  return `https://wa.me/${WPP_NUMBER}?text=${text}&utm_source=site&utm_medium=${utmMedium}&utm_campaign=landing-page`
}
```

Identificadores usados no histórico: `hero-cta-principal`, `cta-apos-como-funciona`, `cta-apos-diferenciais`, `card-produto`, `localizacao`, `navbar`, `botao-flutuante`, `rodape`, `form-cadastro`. Conferir cada chamada atual antes de configurar gatilhos.

CTA 1: “Precisa de uma bateria agora?” / “Chamar no WhatsApp”; mensagem contextual sobre como funciona; `utm_medium=cta-apos-como-funciona`.

CTA 2: “Chega de bateria fraca. Resolva hoje.” / “Quero resolver agora - WhatsApp”; mensagem contextual sobre diferenciais; `utm_medium=cta-apos-diferenciais`.

**Importante:** UTMs em URL externa de WhatsApp não configuram automaticamente GTM, GA4 ou Meta Pixel, nem garantem atribuição ou envio dos parâmetros ao atendente. O código consultado não mostrou eventos explícitos `dataLayer.push` ou `fbq` de clique nos componentes. Será preciso configurar gatilhos/tags ou implementar eventos, preservar UTMs de entrada e testar.

`app/layout.tsx` contém snippets com IDs **placeholder**:

- GTM: `GTM-XXXXXXX`.
- Facebook Pixel: `0000000000000000`.

Portanto, **não há rastreamento real comprovado**. Substituir pelos IDs fornecidos pelo cliente, decidir se Pixel será instalado diretamente ou via GTM para evitar duplicidade, tratar consentimento/privacidade e testar eventos. Não divulgar IDs como se fossem configurados.

## 10. SEO — implementado e pendências

Existem metadata, title, description, keywords, canonical, OpenGraph, Twitter, robots, `lang="pt-BR"`, viewport e JSON-LD `AutoRepair`.

Revisar:

- Domínio definitivo: metadados apontam para `tiagobaterias.com.br`, enquanto deploy conhecido usa Vercel.
- Imagem OG `/og-image.jpg` não encontrada na listagem.
- JSON-LD observado representa Anchieta; incluir/estruturar corretamente as duas unidades se necessário.
- Coordenadas no JSON-LD precisam ser verificadas; não foram validadas geograficamente.
- Não considerar sitemap, robots.txt, Search Console ou desempenho como concluídos sem conferir os arquivos/configurações.
- Usar preços, horários e promessas comerciais confirmados.

## 11. Avaliações — cuidado obrigatório

`Reviews.tsx` contém seis depoimentos estáticos, nomes abreviados e datas de janeiro a junho de 2025. Não há integração/API do Google demonstrada nem evidência de origem desses depoimentos. Apesar de comentário no código e resposta anterior chamarem as avaliações de reais, **essa autenticidade não foi comprovada**.

O cliente pediu avaliações reais do Google Meu Negócio e ofereceu prints. Antes de usar como prova social, obter os prints/dados reais ou fonte verificável e substituir os exemplos. Não afirmar que o feed é automático ou que os depoimentos são reais sem evidência. A implementação observada é grid, não carrossel automático de avaliações.

## 12. Histórico técnico e bugs

1. Site começou como `index.html` único; depois migrado para Next.js + GSAP.
2. Bug de SVG aninhado no catálogo foi corrigido.
3. `themeColor` movido de metadata para export `viewport`.
4. Cliente relatou repetidamente texto aparecendo em flash e desaparecendo. Hipótese anterior: GSAP/StrictMode; não houve comprovação completa de causa. Alteraram hooks para `useEffect + gsap.context()` e desativaram StrictMode. Depois retiraram efeitos de entrada do Hero e o raio animado por pedido explícito.
5. Outros componentes ainda podem usar animações a partir de opacity 0; se texto desaparecer, investigar render/hidratação, triggers, cleanup e motion preferences, em vez de culpar automaticamente StrictMode.
6. Instagram trocou script de embed por iframe para evitar bug de troca.
7. Botões tiveram correção mobile para impedir rolagem horizontal.
8. Último ajuste clareou Como funciona e CTA 1 e aumentou imagens da faixa.

## 13. Rodar, testar e publicar

Na máquina atual:

```powershell
cd "C:\Users\kakac\OneDrive\Documentos\SITE TIAGO BATERIAS\tiago-baterias"
npm install
npm run dev
```

Abrir http://localhost:3000 (ou a porta informada pelo terminal).

Em outra máquina:

```powershell
git clone https://github.com/Jotta-decorarte/tiago-baterias.git
cd tiago-baterias
npm ci
npm run dev
```

Verificação:

```powershell
npx tsc --noEmit
npm run lint
npm run build
```

Produção local, após build bem-sucedido:

```powershell
npm run start
```

Historicamente TypeScript passou sem erros em sessões anteriores; houve um build inicial bem-sucedido e depois falha de worker Jest em outro build. A causa dessa falha **não foi confirmada** (foi descrita antes como memória, sem diagnóstico suficiente). Este documento não executou novo build nem testes visuais.

Na Vercel: importar repositório `Jotta-decorarte/tiago-baterias`, framework Next.js, raiz `./`. Conferir logs/estado do deploy após cada push. Não assumir publicação bem-sucedida apenas porque GitHub recebeu commit.

## 14. Segurança e escopo do Git

- O repositório correto fica **dentro da pasta `tiago-baterias`**.
- No início havia um Git no diretório de usuário apontando para `rogerio-martins-site`; NÃO usar esse repo nem executar `git add .` na pasta do usuário.
- Sempre confirmar `git rev-parse --show-toplevel`, `git remote -v` e `git status` antes de commit/push.
- `.gitignore` exclui node_modules, .next, builds, .env, logs, arquivos de editor, tsbuildinfo e next-env.d.ts.
- Nunca enviar senhas, tokens, `.env` ou dados pessoais fora do escopo.
- A nova conta precisará autenticar GitHub/Vercel novamente. Este Markdown não transfere sessões de login.
- Levar assets e materiais originais; não basta anexar apenas este resumo para reconstruir fielmente as imagens.

## 15. Checklist sugerido para continuidade

- [ ] Confirmar repositório e último deploy, sem sobrescrever mudanças novas.
- [ ] Testar em larguras mobile (320/360/390 px), tablet e desktop: sem overflow, botões alinhados e textos visíveis.
- [ ] Testar Instagram: setas, dots, swipe, indisponibilidade e links alternativos.
- [ ] Testar accordions e form via teclado; revisar mensagem de sucesso do cadastro.
- [ ] Substituir/validar avaliações com dados reais do Google.
- [ ] Informar IDs reais GTM/Pixel, implementar/testar conversões e evitar duplicação.
- [ ] Confirmar domínio e corrigir canonical/OG/JSON-LD das lojas.
- [ ] Revisar dependências e segurança antes de novas publicações, sem atualizar versões cegamente.
- [ ] Validar contraste, alvos de toque e animações reduzidas.

## 16. Mensagem pronta para a nova conta

> Estou transferindo meu projeto Tiago Baterias Delivery. Leia este Markdown e use o repositório https://github.com/Jotta-decorarte/tiago-baterias como fonte atual do código. Não recrie o site do zero. Preserve os ajustes autorizados, principalmente Hero sem raio e sem animação de entrada no título, imagens coloridas na faixa, seções claras, formulário VIP compacto e duas lojas com fotos e Maps. Confira os arquivos antes de alterar e não trate avaliações ou rastreamento como reais/ativos sem validação. Vou informar o próximo ajuste depois que você entender o contexto.
