# Fonte do Conteudo

## Redesign App-First

A identidade visual da landing page passa a ser extraída do aplicativo:

- Fundo `#0C0A08`, superfícies `#14110B`/`#1A160F`/`#211B12`, bordas `#2B2417`.
- Dourado `#D9A24B` (claro `#E9C384`, profundo `#B9782B`), texto creme `#F3EADD`, corpo `#B6AC98`; texto secundário ajustado para `#A19684` para melhor legibilidade.
- Tipografia: Fraunces (títulos) e Inter (corpo), as mesmas do app.
- Botões com gradiente dourado (texto `#221705`); superfícies de interação seguem os materiais escuros e as bordas quentes do app.
- A abertura usa uma imagem de apresentação de produto em tela cheia, com o nome Método RESET em destaque.
- As imagens foram geradas para a composição escura da página, com versões desktop e mobile. São representações de apresentação, não screenshots do aplicativo.
- O design system está centralizado em `:root` de `src/index.css`.
- Estrutura: hero, relato em destaque, método e benefícios, prévia do produto,
  ferramentas, livro + app, conceito, autor, depoimentos, oferta com garantia,
  FAQ, CTA final e rodapé.

As telas são apresentadas em uma prévia navegável (`DevicePreview.tsx`),
controlada por abas com suporte a teclado. A lista de ferramentas abre os
detalhes correspondentes, sem expor o produto completo. Não há screenshots
capturados: as telas são adaptações em React.

Os depoimentos fornecidos têm trechos de destaque e podem ser expandidos para
leitura completa. Não são exibidas estrelas, contagens de clientes ou alegações
de verificação independente. A história do autor tem um resumo fiel, e o
prefácio fornecido continua disponível em uma janela de leitura.

As animações incluem a entrada escalonada do hero, revelação ao rolar, movimento
ambiente da fotografia e transições de abas, acordeões e botões. A preferência
de redução de movimento é respeitada.

Fontes fornecidas pelo proprietario:

- Pagina de vendas: https://mreset.netlify.app/
- Aplicativo vendido: endereco fornecido pelo proprietario apenas como referencia, omitido desta documentacao para nao divulgar o link de entrega.

Tambem foram consultados o `index.html`, o `manifest.json` e o
`service-worker.js` do repositorio publico correspondente. A pagina de vendas
define a oferta comercial; o aplicativo define o funcionamento dos recursos.

O proprietario esclareceu que o aplicativo nao tem login nem senha e que o
link para baixar deve ser entregue exclusivamente na Cakto. Essa orientacao
substitui as recomendacoes anteriores de autenticacao.

## Oferta Publicada

- Preco: R$ 37, pagamento unico.
- Acesso imediato e vitalicio, sem mensalidade.
- Garantia de 7 dias, com reembolso sem necessidade de justificativa.
- Checkout: https://pay.cakto.com.br/8anjw6z_1076473
- Entrega: link para baixar disponivel somente na Cakto, apos a confirmacao do pagamento.
- Uso do aplicativo: sem login e sem senha.

Os dados comerciais estao centralizados em `src/data/content.ts`.
Os CTAs de compra usam `src/components/CheckoutLink.tsx`.

## Conteudo Preservado

- Quiz de duas perguntas, em menos de 30 segundos.
- Matriz da Queda e Checklist de Sintomas Normais da Queda.
- Diario pessoal de escrita livre, com humor opcional, edicao e exclusao de notas.
- Painel Fisico, Ficha de Distanciamento, Mapa de Emocoes e Painel Financeiro.
- Escala de Prontidao, Construtor de Habito, Protocolo de Recaida e outros recursos publicados no app.
- Plano flexivel de 30 dias, organizado por semanas e guiado pela prontidao.
- Livro completo com 15 capitulos em 4 partes, alem de prefacio e introducao.
- O PDF e a leitura do app representam o mesmo conteudo, em formatos diferentes.
- Progresso salvo no dispositivo de uso do app.
- Historia do autor em primeira pessoa, com os fatos do Prefacio do livro: Lucas de Freitas Sousa Oliveira.
- Depoimentos reais de Thiago M., Juliana S. e Danilo R., fornecidos pelo proprietario. Sobrenomes completos nao foram inventados a partir dos recortes truncados.
- Aviso de produto educacional que nao substitui acompanhamento clinico.
- Exportacao e importacao manual de backup JSON, sem sincronizacao automatica.
- Lembrete diario que depende do navegador, permissoes e do app aberto ou minimizado.
- Manifesto e service worker para instalacao/cache em navegadores compativeis.
- SOS com CVV (188 e chat), SAMU (192) e Policia (190).

## Ajustes Apos Consultar o Aplicativo

A pagina de vendas chamava o diario de guiado; a tela `journal()` do app o
apresenta como escrita livre. A landing page agora distingue esse diario das
perguntas estruturadas das ferramentas e da leitura.

A grade ficticia de 30 datas foi substituida por uma previa do cronograma por
semanas. A navegacao segue Inicio, Ler o livro, Diario, Ferramentas e Plano de
30 dias. As cores da previa e as fontes Inter/Fraunces correspondem ao app.

As telas foram adaptadas em React, nao capturadas como screenshots e nao
carregadas por iframe. Os controles da previa navegam, filtram uma amostra de
titulos ou mostram detalhes. Nenhum livro completo, formulario de ferramenta,
diario pessoal ou mecanismo de salvamento do produto e disponibilizado aqui.

## Limites da Previa

A landing page nao fornece acesso gratuito ao produto. A experiencia local da
proposta inicial, seus capitulos e exercicios demonstrativos e os depoimentos
ficticios foram removidos. As telas atuais sao previas adaptadas, nao uma
replica funcional do app adquirido. O exemplo de Marina e a recomendacao da
Matriz da Queda correspondem ao exemplo publicado na pagina original.

O endereco do aplicativo foi fornecido como referencia do produto. Nao foi
adicionado como CTA publico de acesso gratuito, nem embutido na landing page.
Os botoes de compra continuam apontando para a Cakto. Nao foram inventados
links de WhatsApp, atendimento comercial ou download direto do PDF.

## Acesso ao Produto

A pagina publica direciona a compra para a Cakto. O link para baixar nao deve
constar do codigo, de arquivos publicos, de metadados, de iframes ou dos textos
da landing page. Quem ja comprou e orientado a consultar os materiais da sua
compra na Cakto, sem realizar um novo pagamento.

Nao foram adicionados login, senha, cadastro ou area de membros. A configuracao
do link de entrega na conta Cakto precisa ser feita ou conferida pelo
proprietario. Veja `docs/app-publication-notes.md`.

O checkout foi identificado no HTML da pagina fornecida. A consulta automatizada
ao checkout retornou sem conteudo legivel; o pagamento e a entrega do acesso nao
foram testados. Nao foi realizada nenhuma compra.

As interfaces e os recursos foram revisados no codigo-fonte publicado. Nao
foram executados testes de navegador, notificacoes, instalacao ou uso offline
do aplicativo externo.