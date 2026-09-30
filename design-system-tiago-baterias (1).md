# DESIGN SYSTEM — TIAGO BATERIAS DELIVERY
**Landing Page · Versão 1.0 · Junho 2026**

---

## 1. IDENTIDADE VISUAL

### DNA da Marca
- **Energia** — raios, movimento, velocidade
- **Confiança** — solidez, profissionalismo, expertise técnica
- **Urgência** — delivery, rapidez, solução imediata
- **Tom** — direto, masculino, confiável

### Conceito Estético
Dark mode dominante com amarelo gema como acento principal.
Tipografia bold e condensada. Sem arredondamentos excessivos.
Energia industrial com clareza de conversão.

---

## 2. PALETA DE CORES

### Primárias
| Nome        | Hex       | Uso                                      |
|-------------|-----------|------------------------------------------|
| Preto Puro  | `#0A0A0A` | Background principal, navbar             |
| Preto Card  | `#111111` | Fundo de cards e seções alternadas       |
| Amarelo Gema| `#F5C518` | CTA principal, destaques, ícones, raios  |
| Branco      | `#FFFFFF` | Textos principais em fundo escuro        |

### Secundárias
| Nome           | Hex       | Uso                                        |
|----------------|-----------|--------------------------------------------|
| Amarelo Escuro | `#C49B0A` | Hover dos botões, borda de destaque        |
| Cinza Claro    | `#E5E5E5` | Textos secundários, subtítulos             |
| Cinza Médio    | `#888780` | Placeholders, textos de suporte            |
| Cinza Escuro   | `#1E1E1E` | Seções alternadas, fundo de inputs         |

### Suporte / Sistema
| Nome           | Hex       | Uso                                        |
|----------------|-----------|--------------------------------------------|
| Verde WhatsApp | `#25D366` | Botão WhatsApp, ícone de chat              |
| Verde Escuro   | `#128C7E` | Hover do botão WhatsApp                    |
| Vermelho Alerta| `#E24B4A` | Erros de formulário, campo obrigatório     |
| Amarelo Suave  | `#FFF3B0` | Badge de aviso, tag "Mais vendido"         |

### Gradiente de Destaque
```
background: linear-gradient(135deg, #F5C518 0%, #C49B0A 100%);
```

### Overlay Escuro (hero com imagem)
```
background: linear-gradient(to right, rgba(10,10,10,0.95) 50%, rgba(10,10,10,0.4) 100%);
```

---

## 3. TIPOGRAFIA

### Fontes Selecionadas
| Papel          | Fonte                  | Google Fonts           |
|----------------|------------------------|------------------------|
| Display / Hero | **Barlow Condensed**   | wght: 700, 800         |
| Títulos H2–H3  | **Barlow**             | wght: 600, 700         |
| Corpo / UI     | **Inter**              | wght: 400, 500         |
| Badge / Tag    | **Barlow Condensed**   | wght: 600, uppercase   |

> Justificativa: Barlow Condensed tem energia industrial similar à fonte da logo (bold condensada),
> sem ser idêntica. Inter garante legibilidade máxima no corpo. Combinação robusta e sem cara de IA.

### Hierarquia Tipográfica

| Nível  | Fonte              | Tamanho Desktop | Tamanho Mobile | Peso | Line-height |
|--------|--------------------|-----------------|----------------|------|-------------|
| H1     | Barlow Condensed   | 64px            | 38px           | 800  | 1.05        |
| H2     | Barlow Condensed   | 44px            | 30px           | 700  | 1.1         |
| H3     | Barlow             | 28px            | 22px           | 700  | 1.2         |
| H4     | Barlow             | 20px            | 18px           | 600  | 1.3         |
| Body L | Inter              | 18px            | 16px           | 400  | 1.7         |
| Body M | Inter              | 16px            | 15px           | 400  | 1.6         |
| Body S | Inter              | 14px            | 13px           | 400  | 1.5         |
| Caption| Inter              | 12px            | 12px           | 500  | 1.4         |
| Badge  | Barlow Condensed   | 11px            | 11px           | 600  | 1.0         |

### Import Google Fonts
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@600;700&family=Inter:wght@400;500&display=swap" rel="stylesheet">
```

---

## 4. ESPAÇAMENTOS

### Escala Base (múltiplos de 8px)
```css
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  24px;
--space-6:  32px;
--space-7:  48px;
--space-8:  64px;
--space-9:  96px;
--space-10: 128px;
```

### Aplicação por Contexto
| Contexto                        | Valor        |
|---------------------------------|--------------|
| Padding interno de botão        | 14px 28px    |
| Padding interno de card         | 24px         |
| Padding de seção (desktop)      | 96px 0       |
| Padding de seção (mobile)       | 64px 0       |
| Gap entre cards (grid)          | 24px         |
| Gap entre elementos de form     | 16px         |
| Padding container               | 0 24px       |
| Max-width container             | 1200px       |

---

## 5. BORDER RADIUS (Arredondamentos)

```css
--radius-sm:  4px;   /* Tags, badges, inputs pequenos */
--radius-md:  8px;   /* Botões, inputs */
--radius-lg:  12px;  /* Cards de produto, cards de depoimento */
--radius-xl:  16px;  /* Cards de seção, hero boxes */
--radius-pill:9999px;/* Botão WhatsApp flutuante, badges pill */
--radius-none:0px;   /* Separadores, dividers, faixas de marca */
```

> Regra: A marca tem energia e angulosidade — evitar arredondamentos excessivos.
> Cards usam radius-lg, botões usam radius-md. Nunca acima de 16px em blocos grandes.

---

## 6. SOMBRAS

```css
--shadow-sm:  0 2px 8px rgba(0,0,0,0.4);
--shadow-md:  0 4px 20px rgba(0,0,0,0.5);
--shadow-lg:  0 8px 40px rgba(0,0,0,0.6);
--shadow-yellow: 0 0 24px rgba(245,197,24,0.25);  /* Glow em elementos em destaque */
--shadow-cta: 0 4px 20px rgba(245,197,24,0.35);   /* Sombra do botão CTA principal */
```

---

## 7. COMPONENTES

### 7.1 BOTÕES

#### Primário (CTA principal — Comprar WhatsApp)
```css
.btn-primary {
  background: #F5C518;
  color: #0A0A0A;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 14px 32px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(245,197,24,0.35);
  transition: all 0.2s ease;
}
.btn-primary:hover {
  background: #C49B0A;
  transform: translateY(-2px);
  box-shadow: 0 6px 28px rgba(245,197,24,0.5);
}
```

#### WhatsApp (CTA secundário)
```css
.btn-whatsapp {
  background: #25D366;
  color: #FFFFFF;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 14px 32px;
  border-radius: 8px;
  border: none;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.2s ease;
}
.btn-whatsapp:hover {
  background: #128C7E;
  transform: translateY(-2px);
}
```

#### Outline (secundário)
```css
.btn-outline {
  background: transparent;
  color: #F5C518;
  border: 1.5px solid #F5C518;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 13px 30px;
  border-radius: 8px;
  transition: all 0.2s ease;
}
.btn-outline:hover {
  background: #F5C518;
  color: #0A0A0A;
}
```

#### Flutuante WhatsApp (fixo no canto)
```css
.btn-float-wpp {
  position: fixed;
  bottom: 28px;
  right: 28px;
  width: 60px;
  height: 60px;
  background: #25D366;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(37,211,102,0.5);
  z-index: 999;
  transition: transform 0.2s;
}
.btn-float-wpp:hover { transform: scale(1.1); }
```

---

### 7.2 INPUTS DE FORMULÁRIO

```css
.input-field {
  width: 100%;
  background: #1E1E1E;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  padding: 12px 16px;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  color: #FFFFFF;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.input-field::placeholder { color: #888780; }
.input-field:focus {
  border-color: #F5C518;
  box-shadow: 0 0 0 3px rgba(245,197,24,0.15);
}
.input-field.error { border-color: #E24B4A; }

.input-label {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #888780;
  margin-bottom: 6px;
  display: block;
}
```

---

### 7.3 CARDS

#### Card de Produto
```css
.card-produto {
  background: #111111;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 24px;
  transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
}
.card-produto:hover {
  border-color: rgba(245,197,24,0.4);
  transform: translateY(-4px);
  box-shadow: 0 8px 40px rgba(0,0,0,0.6);
}
/* Tag "Mais vendido" */
.card-badge {
  background: #F5C518;
  color: #0A0A0A;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 4px;
}
```

#### Card de Depoimento
```css
.card-depoimento {
  background: #111111;
  border: 1px solid rgba(255,255,255,0.06);
  border-left: 3px solid #F5C518;
  border-radius: 12px;
  padding: 24px;
}
```

#### Card de Diferencial (ícone + texto)
```css
.card-diferencial {
  background: #111111;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
}
.card-diferencial .icon {
  width: 44px;
  height: 44px;
  background: rgba(245,197,24,0.12);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #F5C518;
  font-size: 20px;
}
```

---

### 7.4 NAVBAR

```css
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  background: rgba(10,10,10,0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(245,197,24,0.15);
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
}
```

---

### 7.5 SEÇÃO HERO

```css
.hero {
  min-height: 100vh;
  background: #0A0A0A;
  position: relative;
  display: flex;
  align-items: center;
  padding-top: 80px; /* altura da navbar */
}
/* Imagem de fundo com overlay */
.hero-bg {
  position: absolute;
  inset: 0;
  background-image: url('hero-bg.jpg');
  background-size: cover;
  background-position: center right;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(10,10,10,0.97) 55%, rgba(10,10,10,0.3) 100%);
}
```

---

### 7.6 FAIXA DE MARCAS

```css
.faixa-marcas {
  background: #F5C518;
  padding: 20px 0;
  overflow: hidden;
}
/* Scroll infinito horizontal */
.marcas-track {
  display: flex;
  gap: 60px;
  animation: scroll-marcas 20s linear infinite;
  white-space: nowrap;
}
@keyframes scroll-marcas {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.marcas-track img {
  height: 36px;
  filter: brightness(0); /* logos em preto sobre amarelo */
  opacity: 0.8;
}
```

---

## 8. LINK WHATSAPP COM UTM

### Estrutura do link
```
https://wa.me/5521987323958?text=Olá!%20Vim%20pelo%20site%20e%20quero%20pedir%20uma%20bateria.
```

### Com UTM tracking
```
https://wa.me/5521987323958?text=Olá!%20Vim%20pelo%20site%20(utm_source=site%26utm_medium=botao-hero%26utm_campaign=landing-page)%20e%20quero%20uma%20bateria.
```

### Links por seção (para rastreamento)
| Seção            | utm_medium          |
|------------------|---------------------|
| Botão Hero       | `botao-hero`        |
| Card de Produto  | `card-produto`      |
| Seção Como Funciona | `como-funciona`  |
| Botão Flutuante  | `botao-flutuante`   |
| Rodapé           | `rodape`            |

---

## 9. ESTRUTURA DE SEÇÕES DA LP

| # | Seção                    | Objetivo                        |
|---|--------------------------|---------------------------------|
| 1 | Navbar fixa              | Navegação + CTA WhatsApp        |
| 2 | Hero                     | Impacto + CTA principal         |
| 3 | Faixa de marcas          | Prova social / confiança        |
| 4 | Como funciona (3 passos) | Reduzir fricção                 |
| 5 | Catálogo de baterias     | Apresentar produtos             |
| 6 | Diferenciais             | Quebrar objeções                |
| 7 | Avaliações Google        | Prova social                    |
| 8 | Posts Instagram          | Engajamento / humanização       |
| 9 | Cadastro de cliente      | Captura de lead                 |
| 10| Localização + Horários   | Conversão final                 |
| 11| Rodapé                   | Links + contato                 |
| —  | Botão flutuante WhatsApp | Conversão em qualquer scroll    |

---

## 10. VARIÁVEIS CSS GLOBAIS

```css
:root {
  /* Cores */
  --color-bg:         #0A0A0A;
  --color-bg-card:    #111111;
  --color-bg-alt:     #1E1E1E;
  --color-yellow:     #F5C518;
  --color-yellow-dark:#C49B0A;
  --color-white:      #FFFFFF;
  --color-gray-light: #E5E5E5;
  --color-gray-mid:   #888780;
  --color-wpp:        #25D366;
  --color-wpp-dark:   #128C7E;
  --color-error:      #E24B4A;
  --color-border:     rgba(255,255,255,0.08);
  --color-border-yellow: rgba(245,197,24,0.3);

  /* Tipografia */
  --font-display: 'Barlow Condensed', sans-serif;
  --font-title:   'Barlow', sans-serif;
  --font-body:    'Inter', sans-serif;

  /* Espaçamentos */
  --space-1: 4px;  --space-2: 8px;   --space-3: 12px;
  --space-4: 16px; --space-5: 24px;  --space-6: 32px;
  --space-7: 48px; --space-8: 64px;  --space-9: 96px;
  --space-10: 128px;

  /* Border Radius */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-pill: 9999px;

  /* Sombras */
  --shadow-sm:     0 2px 8px rgba(0,0,0,0.4);
  --shadow-md:     0 4px 20px rgba(0,0,0,0.5);
  --shadow-lg:     0 8px 40px rgba(0,0,0,0.6);
  --shadow-yellow: 0 0 24px rgba(245,197,24,0.25);
  --shadow-cta:    0 4px 20px rgba(245,197,24,0.35);

  /* Container */
  --max-width: 1200px;
}
```

---

*Design System criado pela Agência GPV para o projeto Tiago Baterias · 2026*
