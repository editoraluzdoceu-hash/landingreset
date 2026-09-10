# Acesso ao Aplicativo Vendido

## Fluxo Definido Pelo Proprietario

O aplicativo nao tem login nem senha. Nao criar autenticacao, tela de cadastro,
area de membros ou verificacao de compra dentro dele como parte deste projeto.

O link para baixar deve ser disponibilizado exclusivamente na Cakto, apos a
confirmacao do pagamento. A landing page apresenta o produto e encaminha a
compra ao checkout oficial. Ela nao entrega nem hospeda o aplicativo completo.

## Regras da Landing Page

- Nao incluir o endereco do aplicativo ou do download no HTML, JavaScript, CSS ou arquivos publicos.
- Nao armazenar o link em constantes de cliente, atributos ocultos, metadados ou iframes.
- Manter os CTAs de compra no checkout da Cakto.
- Orientar quem ja comprou a consultar sua compra na Cakto, sem cobrar novamente.
- Mostrar somente previas adaptadas, sem disponibilizar o produto completo.
- Explicar que o aplicativo nao exige login nem senha.

O endereco de entrega foi omitido tambem desta documentacao. Os textos desse
fluxo estao centralizados em `delivery`, em `src/data/content.ts`.

## Configuracao Externa

O proprietario deve cadastrar ou manter o link nos materiais de entrega do
produto dentro da Cakto. Essa configuracao nao foi feita nem verificada aqui;
nao ha acesso ao painel da conta. Nao foi realizada compra de teste.

Nenhuma alteracao foi feita no aplicativo externo ou na sua hospedagem. O
controle do local de divulgacao do link nao e uma autenticacao do aplicativo.