# Instruções para agentes — Energisa SCR

Estas instruções se aplicam a todo o repositório. Leia também `CLAUDE.md` e os arquivos relacionados à tarefa antes de editar. Preserve as regras válidas de `CLAUDE.md`, consolidadas abaixo, e respeite o escopo autorizado pelo usuário.

## 1. Contexto

Projeto interno Energisa — SCR / Sistema Central de Reclamações. O pacote se chama `energisa-design-system`.

Stack declarada no repositório:

- React 18 e React DOM 18, TypeScript e Vite 5 com plugin React.
- Tailwind CSS v4 integrado por `@tailwindcss/vite`.
- Componentes locais com padrões shadcn/ui: `class-variance-authority` (`cva`), utilitário `cn`, `clsx`, `tailwind-merge` e primitives Radix (`react-label` e `react-slot`).
- Storybook 8 com `@storybook/react-vite`, addons Essentials e A11y e documentação MDX.
- Ícones Lucide React e assets específicos do Figma incorporados como componentes locais.

Arquitetura atual:

- Aplicação: `index.html` → `src/main.tsx` → `src/App.tsx`.
- Componentes oficiais: `src/components/ui/`; ícones: `src/components/ui/icons/`.
- Stories e documentação do Design System: `src/design-system/`, incluindo `Introduction.mdx` e arquivos `*.stories.tsx`.
- Configuração do Storybook: `.storybook/main.ts`, `.storybook/preview.ts` e `.storybook/DocsPage.tsx`.
- Tokens e estilos compartilhados: `src/styles/tokens.css`, importado pela aplicação e pelo Storybook.
- Utilitários e contexto compartilhado: `src/lib/`; assets: `src/assets/`.
- Alias `@` aponta para `src/` no Vite e no Storybook.

Confirme a stack nos arquivos atuais; não presuma tecnologias ou serviços ausentes.

## Claude Code e Codex

- `CLAUDE.md` e o código existente representam o padrão de implementação já estabelecido no projeto.
- Claude Code é atualmente o agente principal utilizado no desenvolvimento e a referência para o padrão de codificação estabelecido no repositório.
- Codex atua como agente complementar e, quando necessário, substituto operacional, seguindo a mesma arquitetura, organização, convenções, padrões de componentes e estilo de implementação existentes. Não deve estabelecer uma segunda arquitetura, um segundo padrão de código ou uma abordagem paralela.
- Antes de implementar algo novo, Codex deve observar como funcionalidades equivalentes já foram implementadas no repositório.
- Quando existir uma solução/padrão já criado pelo Claude Code e aprovado no projeto, reutilizar esse padrão em vez de criar uma alternativa.
- Não criar abstrações, helpers, estruturas de pasta, APIs, padrões React, estratégias CSS/Tailwind ou convenções diferentes apenas por preferência do agente.
- Não reescrever código válido criado anteriormente apenas para adequá-lo ao estilo preferido pelo Codex.
- Se `AGENTS.md` e `CLAUDE.md` abordarem a mesma regra, devem ser interpretados de forma complementar. Não criar divergência entre eles.
- Se houver dúvida entre duas abordagens tecnicamente válidas, preferir aquela já predominante no código existente.
- Storybook continua sendo a fonte de verdade dos componentes e Figma a referência visual quando explicitamente fornecido.
- Uma mudança arquitetural significativa deve ser reportada antes de ser executada.

### Continuidade entre agentes

O objetivo é permitir `Claude Code → Codex` ou `Codex → Claude Code` sem que o próximo agente precise refazer o trabalho anterior.

Por isso, todo código novo deve parecer parte do mesmo projeto independentemente de qual agente o escreveu.

## Regra crítica — trabalhar sobre o existente

**Claude Code continua sendo o agente principal do projeto e o código existente é a referência de implementação. Codex deve trabalhar sobre o código existente, nunca criar uma implementação paralela para reproduzi-lo.**

O projeto já possui Design System consolidado, componentes oficiais em `src/components/ui/`, Storybook, aplicação funcional, telas, tokens e arquitetura estabelecida pelo Claude Code. O objetivo do Codex é preservar e continuar esse trabalho.

### Proibido recriar componentes existentes

Antes de criar qualquer arquivo, componente, HTML, CSS, página, mock, protótipo ou implementação temporária, verificar se a estrutura necessária já existe no repositório.

Se existir, **usar e inspecionar o existente**. Não criar uma cópia para facilitar análise.

É explicitamente proibido criar:

- HTML paralelo para reproduzir componente existente.
- Página temporária para imitar Storybook.
- Sidebar alternativa.
- Componente alternativo.
- CSS duplicado.
- Mock visual de componente já implementado.
- Versão "Codex" de componente existente.
- Segunda implementação apenas para comparação visual.

### Storybook

Storybook já está consolidado. `http://localhost:6006/` é a implementação/documentação oficial dos componentes.

Para analisar um componente:

1. Localizar sua implementação real.
2. Localizar sua story real.
3. Abrir/renderizar a story existente.
4. Inspecionar DOM e estilos computados dessa implementação.
5. Comparar com o consumidor real na aplicação.

Não recriar o componente fora do Storybook para analisá-lo.

### Aplicação

A aplicação existente em `http://localhost:5173/` deve ser analisada diretamente. Não criar HTML separado para representá-la nem página auxiliar apenas para comparação.

### Comparação visual

Para comparar `Storybook × Aplicação`, usar as duas implementações reais já executando. Podem ser utilizadas ferramentas de inspeção do navegador, DOM, computed styles e screenshots das páginas reais.

Não produzir uma terceira implementação para servir de referência.

### NavigationSidebar

A auditoria atual confirmou que Storybook e aplicação usam o mesmo `NavigationSidebar`, não existe implementação legacy/paralela e as dimensões estruturais principais coincidem. As diferenças atuais são principalmente props, conteúdo, hierarquia e seleção; também foi identificada diferença de fonte herdada no wrapper Docs do Storybook.

- Não criar outro menu.
- Não criar HTML de menu.
- Não substituir `NavigationSidebar`.
- Não copiar seu CSS.

Qualquer correção futura deve partir do componente existente e das props/consumidores existentes.

### Claude Code

O projeto foi estruturado e desenvolvido principalmente com Claude Code. Antes de implementar algo:

1. Ler `CLAUDE.md`.
2. Ler `AGENTS.md`.
3. Observar o padrão do código existente.
4. Procurar implementação equivalente já criada.
5. Continuar no mesmo padrão.

Codex não deve introduzir uma arquitetura ou estilo próprio quando já existe padrão consolidado.

### Criação de novos arquivos

Antes de criar qualquer novo arquivo de implementação, Codex deve conseguir justificar que:

1. Não existe equivalente no projeto.
2. Não existe componente reutilizável.
3. Não existe story correspondente.
4. A tarefa realmente exige algo novo.

Se qualquer equivalente existir, reutilizar.

### Arquivos temporários

Não criar arquivos temporários dentro do repositório para inspeção visual. Para diagnóstico, preferir navegador, DOM, computed styles, screenshots das páginas reais, comandos somente leitura e código existente.

### Regra final

Neste projeto, seguir **investigar → reutilizar → ajustar**. Não seguir **investigar → recriar → substituir**.

O objetivo é preservar integralmente o Design System, Storybook e arquitetura já consolidados.

## 2. Fontes de verdade

Para componentes, **Storybook é a fonte de verdade visual, estrutural e comportamental**. A aplicação deve consumir e seguir os componentes aprovados no Storybook.

Em caso de divergência, a direção de alinhamento é `Storybook → Aplicação`. Nunca modificar o Storybook apenas para fazê-lo coincidir com uma implementação divergente da aplicação.

Quando houver referência explícita a um layout aprovado no Figma:

- `Figma → especificação visual`.
- `Storybook → implementação oficial do componente`.
- `Aplicação → composição desses componentes`.

Uma evolução deliberada de componente exige justificativa e atualização de sua implementação e documentação; não deve legitimar uma divergência acidental da aplicação.

## 3. Reutilização

Antes de criar qualquer componente, procurar, nesta ordem:

1. Componente existente.
2. Variant existente.
3. Primitive existente.
4. Token existente.
5. Somente depois considerar criação.

Evitar implementações paralelas. Se a aplicação usa uma versão legacy e existe componente oficial correspondente no Storybook, preferir migrar para o componente oficial em vez de copiar seu CSS.

## 4. Design System

Nunca alterar componentes mestres, variants, APIs ou tokens globais para resolver uma necessidade isolada de uma página sem avaliar o impacto no sistema.

Mudanças globais precisam ser explicitamente justificadas. Preservar compatibilidade sempre que possível e verificar os consumidores afetados.

## 5. Tokens

Usar prioritariamente os semantic tokens existentes. Componentes devem consumir tokens semânticos (`var(--color-*)`, `var(--radius-*)`, etc.), sem inventar cores, espaçamentos ou valores visuais crus.

Não introduzir HEX/RGB ou cores hardcoded quando existir token correspondente. Não substituir semantic tokens por primitives diretos.

Estrutura esperada: `componente → semantic token → primitive`, em vez de `componente → valor visual hardcoded`.

Arquivo principal: `src/styles/tokens.css`, fonte compartilhada de cores, espaçamento, radius, tipografia e demais tokens. Os tokens derivam das Variables do Figma. Para mudanças de valores do sistema, atualizar a referência no Figma primeiro e seguir o fluxo de sincronização efetivamente disponível; não presumir que um script citado em comentário exista.

Se faltar um token, avaliar se ele deve existir no Figma e no Design System antes de inventar um valor. A exceção restrita para cor literal de ícone confirmado no Figma está descrita na seção 10.

## 6. Padrão de hover

Para controles/menu items equivalentes ao padrão aprovado:

- Default: background transparente e `text-secondary` (`--color-text-secondary`).
- Hover: `surface-tertiary` (`--color-surface-tertiary`) e `text-primary` (`--color-text-primary`).
- Radius padrão, quando aplicável: `sm = 8px`, por meio de `--radius-sm`.

Usar semantic tokens, nunca primitives diretos. Aplicar este padrão aos controles equivalentes; componentes com especificação própria aprovada no Storybook/Figma devem manter essa especificação. Não uniformizar globalmente estados de menu, navegação, seleção ou intents que tenham tokens próprios sem diagnóstico e justificativa.

## 7. Sidebar / Navigation

A `NavigationSidebar` documentada no Storybook é a referência oficial. Preservar:

- Expanded/Collapsed.
- Active/Selected e Hover.
- Submenu Open/Closed, chevrons e tooltips.
- Search, Footer/Profile, Avatar e divisores.

Comportamento esperado de submenu:

- `Has Submenu = False`: sem chevron e sem children.
- `Has Submenu = True + Closed`: chevron Right e children ocultos.
- `Has Submenu = True + Open`: chevron Down e children visíveis.

Esses nomes descrevem estados de design; mapear para as props existentes sem inventar uma API paralela. Não deixar altura residual de submenu fechado nem permitir sobreposição durante abertura/fechamento. Preservar seleção e expansão nos níveis aninhados existentes.

## 8. Avatar

Preservar o comportamento global existente. O componente suporta foto (`image`), iniciais (`initials`) e presets (`preset`), com fallback para iniciais quando a imagem não carrega.

Reutilizar `src/components/ui/avatar.tsx`, `avatar-presets.ts` e o contexto/hooks em `src/lib/use-current-user.tsx`. A seleção existente de iniciais/presets é compartilhada por identificador da pessoa e persistida em `localStorage`; manter consistência entre os diferentes pontos da aplicação.

Não criar comportamento paralelo de avatar nem presumir que a seleção persistida de foto já exista apenas porque o componente aceita `src`.

## 9. Storybook

Manter a documentação conforme `CLAUDE.md`. O site nunca deve consumir um componente que não esteja documentado no Storybook primeiro.

Fluxo obrigatório ao criar ou alterar um componente:

1. Implementar/editar em `src/components/ui/`, consumindo semantic tokens.
2. Criar/atualizar a story correspondente em `src/design-system/`, cobrindo variantes, tamanhos e estados principais.
3. Atualizar `src/design-system/Introduction.mdx`: marcar o item no Roadmap de componentes e, se for componente novo, adicionar uma linha descrevendo-o.
4. Só então consumir no site (`src/App.tsx` ou futuras páginas).

Não pular os passos 2–3 para economizar tempo. Um componente sem story é considerado não existente para efeito de uso no site.

Ao alterar um componente existente, verificar stories, docs, estados, Light/Dark quando aplicável e regressões. Não considerar concluído se Storybook e aplicação divergirem sem justificativa.

## 10. Figma

Quando uma tarefa fornecer referência explícita do Figma, não inventar novo layout, não substituir assets sem necessidade e respeitar componentes e propriedades aprovados. Usar Figma como referência visual e Storybook como referência da implementação oficial do componente.

Preservar integralmente a regra de ícones de `CLAUDE.md`: Lucide React é a biblioteca do projeto, mas um ícone do Figma sem a mesma geometria na Lucide nunca deve ser substituído por um ícone apenas parecido.

1. Antes de criar, verificar se o mesmo asset já foi incorporado por outro componente.
2. Baixar o SVG exato exportado pelo Figma MCP, preservando paths e viewBox.
3. Criar o componente em `src/components/ui/icons/<nome-do-asset>.tsx`, com o nome do Figma e `fill="currentColor"` para permitir recoloração.
4. Confirmar a cor real via `get_variable_defs`; se vazio, consultar o fill diretamente no Plugin API (`use_figma`). Nunca assumir um token semântico parecido, como warning/danger, sem confirmação.
5. Checar mais de uma instância/variante do mesmo ícone. Se houver uma variante com variável vinculada, ela é a fonte de verdade para identificar a variável; não concluir pela variante com fill cru.
6. Somente se nenhuma instância tiver variável vinculada e o fill literal estiver confirmado, usar o valor literal no local de uso, nunca no componente do ícone.
7. Só então usar o ícone no componente que precisa dele.

Ao usar ferramentas Figma, seguir também suas instruções e skills aplicáveis.

## 11. Light / Dark

Preservar o suporte existente a Light/Dark. Não corrigir um tema quebrando o outro.

Tokens de tema estão em `src/styles/tokens.css`; Light é o padrão e Dark usa `[data-theme="dark"]` ou `.dark`. O Storybook oferece seleção de tema na toolbar.

Quando uma mudança afetar cores, surfaces, borders, text ou icons, verificar ambos os temas quando aplicável. Preferir a resolução dos semantic tokens pelo CSS à criação de lógica paralela de tema por componente.

## 12. Alterações locais vs globais

Para necessidade específica de página, preferir composição, prop ou override local apropriado que respeite a API e os estados oficiais do componente.

Para mudança de comportamento do sistema, avaliar o componente e o Storybook. Não transformar uma exceção de página em mudança global sem necessidade nem usar override local para mascarar a causa de uma divergência.

## 13. Auditoria antes de corrigir

Quando solicitado a alinhar a aplicação com Storybook/Figma, primeiro diagnosticar:

- Componente importado, props e variants.
- Wrappers, DOM, CSS e Tailwind.
- Tokens e estilos globais.
- Dimensões computadas.
- Versão legacy e comportamento.

Depois corrigir a causa. Não fazer apenas aproximação visual. Distinguir o que foi observado no navegador do que foi inferido pela leitura do código.

## 14. Validação

Depois de alterações de UI, quando os ambientes estiverem disponíveis, validar:

- Aplicação: `http://localhost:5173/`.
- Storybook: `http://localhost:6006/`.

Para componentes interativos, verificar os estados relevantes, incluindo seleção, abertura/fechamento, hover, foco e disabled quando aplicáveis, além de Light/Dark.

Executar build/testes/lint disponíveis e apropriados antes de considerar concluído. Scripts atuais de `package.json`:

- `npm run dev`: `vite`.
- `npm run build`: `vite build`.
- `npm run storybook`: `storybook dev -p 6006`.
- `npm run build-storybook`: `storybook build`.

Não há scripts de testes ou lint declarados atualmente; não inventar comandos nem instalar ferramentas para preencher essa ausência sem necessidade. Não iniciar ou encerrar servidores existentes desnecessariamente. Em tarefas restritas a documentação ou somente leitura, respeitar o escopo e evitar builds que gerem arquivos.

Informar limitações de validação. Uma resposta HTTP confirma acesso, mas não comprova equivalência visual ou comportamento interativo.

## 15. Segurança de alteração

Antes de editar, verificar o estado atual do repositório, os arquivos relacionados e preservar trabalho existente, incluindo alterações locais pré-existentes.

Não:

- Apagar trabalho válido.
- Fazer refatoração ampla fora do escopo.
- Alterar arquivos não relacionados.
- Instalar dependências sem necessidade.
- Executar migration sem solicitação.
- Fazer commit ou push automaticamente.

Respeitar solicitações de somente diagnóstico e restrições explícitas sobre arquivos e processos.

## 16. Escopo

Fazer a menor alteração capaz de resolver corretamente o problema. Evitar aproveitar uma tarefa para reorganizar outras partes do projeto.

## 17. Relatório

Ao finalizar uma implementação, informar objetivamente:

- Causa encontrada.
- Arquivos alterados.
- O que foi modificado.
- Validações executadas.
- Diferenças restantes e limitações.
- Se houve impacto no Design System.

Não declarar equivalência visual sem efetivamente validar.
