export type ProductTab = 'home' | 'book' | 'journal' | 'tools' | 'plan';
export type ToolMockKind = 'quiz' | 'matrix' | 'journal' | 'emotions' | 'finance' | 'plan';

// A sales page defines the offer; the published app defines its capabilities.
export const official = {
  siteUrl: 'https://mreset.netlify.app/',
  checkoutUrl: 'https://pay.cakto.com.br/8anjw6z_1076473',
  price: 37,
  currency: 'BRL',
  guaranteeDays: 7,
  planDays: 30,
  bookChapters: 15,
  bookParts: 4,
  disclaimer: 'O Método RESET é um produto educacional de organização e desenvolvimento pessoal. Não substitui acompanhamento clínico, psicológico ou psiquiátrico.',
} as const;

// The download URL belongs only in Cakto, never in this public site.
export const delivery = {
  summary: 'Link para baixar disponível somente na Cakto, após a confirmação do pagamento.',
  instructions: 'Após a confirmação do pagamento, consulte sua compra na Cakto para obter o link para baixar o aplicativo. Esse link é disponibilizado exclusivamente lá, não nesta página de vendas.',
  appUsage: 'O aplicativo não exige login nem senha. Depois de baixar pelo link disponibilizado na Cakto, você pode começar a usar, sem criar uma conta no app.',
  returningBuyer: 'O link para baixar está nos materiais e nas instruções da sua compra na Cakto. Consulte a compra já realizada; você não precisa comprar novamente. Esta página não disponibiliza o link de download.',
} as const;

export const formattedPrice = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: official.currency,
}).format(official.price);

export const productTabs: { id: ProductTab; title: string; description: string }[] = [
  {
    id: 'home',
    title: 'Seu ponto de partida',
    description: 'O quiz sugere uma ferramenta para o seu momento. Na tela inicial, acompanhe a leitura, retome as práticas e configure seu lembrete diário.',
  },
  {
    id: 'book',
    title: 'Uma leitura para o seu ritmo',
    description: '15 capítulos em 4 partes, com busca e marcação de leitura. O PDF traz a mesma jornada em outro formato, para consultar offline ou imprimir.',
  },
  {
    id: 'journal',
    title: 'Um diário só seu',
    description: 'Um espaço livre, separado das ferramentas. Escreva uma nota, escolha um registro de humor opcional e volte para editar ou excluir quando quiser.',
  },
  {
    id: 'tools',
    title: 'Ferramentas que você abre e usa',
    description: 'Matriz da Queda, Escala de Prontidão, painéis, Construtor de Hábito e Protocolo de Recaída. Preencha só o que for útil agora, com salvamento local.',
  },
  {
    id: 'plan',
    title: '30 dias, sem transformar em corrida',
    description: 'Reconhecer, estabilizar, sistematizar e executar, com um cronograma flexível. Trinta dias estabelecem bases, não prometem uma reconstrução completa.',
  },
];

export const appNavigation: { id: ProductTab; label: string }[] = [
  { id: 'home', label: 'Início' },
  { id: 'book', label: 'Ler o livro' },
  { id: 'journal', label: 'Diário' },
  { id: 'tools', label: 'Ferramentas' },
  { id: 'plan', label: 'Plano de 30 dias' },
];

export const journey: { label: string; title: string; text: string; tab: ProductTab }[] = [
  {
    label: 'SEMANA 1',
    title: 'Reconhecer e estabilizar',
    text: 'Comece pela Matriz da Queda, pelo checklist de sintomas e pela Escala de Prontidão. A proposta é reconhecer o que aconteceu e iniciar a estabilização física.',
    tab: 'tools',
  },
  {
    label: 'SEMANAS 2 E 3',
    title: 'Cuidar das suas bases',
    text: 'Use os painéis físico e financeiro, a Ficha de Distanciamento e o Mapa de Emoções. Complete a estabilização e comece a sistematizar. Repita a fase se ainda não estiver pronto.',
    tab: 'tools',
  },
  {
    label: 'FINAL DA SEMANA 3',
    title: 'Escolher um hábito possível',
    text: 'Repita a Escala de Prontidão. Se for o seu momento, escolha um hábito e construa uma versão mínima viável. Se precisar de mais tempo, continue na fase anterior.',
    tab: 'plan',
  },
  {
    label: 'SEMANA 4',
    title: 'Executar, revisar e retomar',
    text: 'Sustente um hábito pequeno, use o Protocolo de Recaída quando necessário e faça uma breve reflexão. Uma falha não anula o progresso anterior.',
    tab: 'plan',
  },
];

export const offerList = [
  'App com quiz e sugestão do próximo passo',
  'Todas as ferramentas práticas do RESET',
  'Diário pessoal e registro opcional de humor',
  'Plano flexível de 30 dias',
  'Livro completo: 15 capítulos, no app e em PDF',
  'Progresso local com exportação de backup',
  'Acesso vitalício, sem mensalidade',
];

export const toolNames = [
  'Matriz da Queda',
  'Checklist de Sintomas Normais da Queda',
  'Escala de Prontidão',
  'Painel Físico',
  'Ficha de Distanciamento',
  'Mapa de Emoções',
  'Painel Financeiro',
  'Painel de Estabilização Integrado',
  'Construtor de Hábito RESET',
  'Protocolo de Recaída RESET',
  'Carta ao Eu Anterior',
  'Cronograma RESET de 30 Dias',
  'Checklist de Revisão Trimestral RESET',
  'Painel de Manutenção Anual RESET',
];

export const quizMoments = [
  'Perda de emprego',
  'Fim de um relacionamento',
  'Luto ou uma perda',
  'Outro momento difícil',
];

export const toolShowcase: { name: string; situation: string; text: string; mock: ToolMockKind; tab: ProductTab }[] = [
  {
    name: 'Quiz RESET',
    situation: 'não souber nem por onde começar',
    text: 'Responda algumas perguntas e identifique qual área da sua vida merece sua atenção neste momento.',
    mock: 'quiz',
    tab: 'home',
  },
  {
    name: 'Matriz da Queda',
    situation: 'tudo parecer estar desmoronando ao mesmo tempo',
    text: 'Organize aquilo que parece um caos: separe o fato, a interpretação e o próximo passo possível, em uma única folha.',
    mock: 'matrix',
    tab: 'tools',
  },
  {
    name: 'Diário pessoal',
    situation: 'precisar de um espaço para me escutar',
    text: 'Um lugar só seu para escrever livremente, registrar o dia e escolher, se quiser, como está se sentindo.',
    mock: 'journal',
    tab: 'journal',
  },
  {
    name: 'Mapa de Emoções',
    situation: 'sentir várias coisas ao mesmo tempo',
    text: 'Identifique e organize melhor o que está sentindo, em vez de carregar tudo misturado na cabeça.',
    mock: 'emotions',
    tab: 'tools',
  },
  {
    name: 'Painel Financeiro',
    situation: 'precisar olhar para a realidade financeira',
    text: 'Organize informações importantes e comece a enxergar sua situação com mais clareza.',
    mock: 'finance',
    tab: 'tools',
  },
  {
    name: 'Plano de 30 Dias',
    situation: 'não souber como será o futuro, mas precisar começar',
    text: 'Transforma a ideia de mudança em pequenas ações distribuídas em um cronograma flexível de semanas.',
    mock: 'plan',
    tab: 'plan',
  },
];

export const howItWorks: { number: string; title: string; text: string }[] = [
  {
    number: '01',
    title: 'Entenda onde você está',
    text: 'Olhe para o seu momento com mais clareza. O quiz ajuda a encontrar um ponto de partida, sem precisar ter todas as respostas.',
  },
  {
    number: '02',
    title: 'Descubra o que merece atenção',
    text: 'Separe o que precisa de atenção agora do que pode esperar. Nem tudo é urgente, e você não precisa carregar tudo ao mesmo tempo.',
  },
  {
    number: '03',
    title: 'Encontre seu próximo passo',
    text: 'Transforme a reflexão em uma ação pequena e concreta. A Matriz da Queda, o diário e os painéis ajudam você a sair do pensamento para a prática.',
  },
  {
    number: '04',
    title: 'Continue avançando',
    text: 'Siga o plano por semanas, no seu ritmo. Se um dia for difícil, o Protocolo de Recaída ajuda a retomar pequeno, sem apagar o caminho percorrido.',
  },
];

export const bookPreviewEntries = [
  { group: 'MÉTODO RESET', title: 'Prefácio' },
  { group: 'MÉTODO RESET', title: 'Introdução' },
  { group: 'PARTE I: A QUEDA', title: 'Capítulo 1: O dia em que o chão sumiu' },
];

export const appSupport = {
  cvvPhone: 'tel:188',
  cvvChat: 'https://www.cvv.org.br/chat/',
  samu: 'tel:192',
  police: 'tel:190',
} as const;

export const founder = {
  name: 'Lucas de Freitas Sousa Oliveira',
  role: 'Criador do Método RESET',
  source: 'Prefácio do livro Método RESET',
  headline: 'Eu não criei o RESET porque descobri todas as respostas. Criei porque também precisei descobrir um caminho.',
  quote: 'Eu não escrevi este livro depois de superar tudo. Escrevi no meio do processo, e continuei escrevendo enquanto ele acontecia.',
  summary: [
    'Depois da pandemia, perdi minha carreira nas Forças Armadas. Mais tarde, vivi a separação da mulher com quem estava desde 2014, mãe dos meus dois filhos. Em momentos diferentes, o chão sumiu debaixo de mim.',
    'Eu não precisava ouvir mais um "vai passar". Precisava saber o que fazer na segunda-feira de manhã. Então reuni o pouco que havia estudado de Psicologia com leituras sobre luto, hábitos e comportamento, testando o que me ajudava a atravessar aqueles dias.',
    'O RESET nasceu desse caminho. Não como uma promessa de resolver a vida de alguém, mas como a estrutura que eu gostaria de ter encontrado quando precisei recomeçar.',
  ],
  paragraphs: [
    'Depois da pandemia, perdi o emprego que eu tinha nas Forças Armadas: uma carreira estável, um salário que passava dos R$ 10 mil por mês, uma identidade inteira construída em torno de uma farda e uma rotina. No início deste ano, perdi também minha esposa. A mulher com quem eu estava desde 2014, mãe dos meus dois filhos. Duas vezes, em momentos diferentes da minha vida, o chão sumiu debaixo de mim.',
    'Da segunda vez, eu não tinha o luxo de desabar por completo. Tinha dois filhos olhando para mim, esperando saber se o pai deles ainda estava de pé. Foi aí que percebi o quanto os conselhos que todo mundo me dava, "o tempo cura", "vai passar", "pensa positivo", não serviam para nada quando eu precisava, literalmente, saber o que fazer na segunda-feira de manhã.',
    'Então comecei a construir, sozinho, um caminho. Usei o pouco que tinha estudado de Psicologia, misturei com tudo que fui lendo sobre luto, hábitos e comportamento humano, e fui testando em mim mesmo o que realmente ajudava a atravessar os dias mais difíceis e o que era só ruído bonito.',
    'O Método RESET é esse caminho, organizado para que você não precise reconstruí-lo do zero como eu precisei. Hoje, minha esposa e eu estamos juntos de novo, com casamento marcado para o ano que vem. Não porque o tempo curou sozinho, mas porque houve estrutura, trabalho e escolhas conscientes em cada etapa da reconstrução.',
    'Este livro não é uma teoria que li em algum lugar. É o mapa que desenhei enquanto atravessava minha própria queda. Se você está no meio da sua agora, espero que ele te poupe um pouco do tempo que eu levei para encontrar o caminho.',
  ],
};

export const testimonials = [
  {
    name: 'Thiago M.',
    context: 'Capítulo 12 · Protocolo de Recaída',
    excerpt: 'Antes eu teria desistido de tudo e me afundado. Pela primeira vez eu não desisti de mim.',
    quote: 'Eu vinha super bem nas primeiras duas semanas até que vi uma foto antiga no domingo e passei o dia todo na cama sem comer, achando que tinha voltado à estaca zero. Abri o Capítulo 12 e apliquei o Protocolo de Recaída em 3 Passos: reconhecer o gatilho sem me massacrar, voltar ao mínimo viável e retomar na segunda-feira sem cobrança retroativa. Antes eu teria desistido de tudo e me afundado. Pela primeira vez eu não desisti de mim.',
  },
  {
    name: 'Juliana S.',
    context: 'Checklist de Sintomas · Dia 22 do plano',
    excerpt: 'Quando cheguei no Capítulo 2 e preenchi o Checklist de Sintomas Normais, foi como tirar uma tonelada do peito',
    quote: 'Quando meu casamento terminou no início do ano, me vi sozinha em casa com dois filhos pequenos, de 4 e 2 anos. Eu não conseguia levantar sem chorar e me culpava por não ser forte. Quando cheguei no Capítulo 2 e preenchi o Checklist de Sintomas Normais, foi como tirar uma tonelada do peito: entendi que meu cérebro estava em choque biológico, não que eu era fraca. O Painel dos 4 Pilares da Estabilização Física me deu o mínimo para conseguir alimentar as crianças e dormir 5 horas seguidas. Hoje fechei o dia 22 do plano. Esse método salvou minha sanidade.',
  },
  {
    name: 'Danilo R.',
    context: 'Construtor de Hábitos',
    excerpt: 'Parece pouco, mas ver o progresso somando dia após dia no aplicativo reconstruiu minha autoconfiança.',
    quote: 'Meu maior erro sempre foi querer mudar alimentação, treino, trabalho e estudos tudo no mesmo dia depois do tombo. No terceiro dia eu quebrava e me achava um derrotado. O Construtor de Hábitos me amarrou a 1 único micro-hábito. Parece pouco, mas ver o progresso somando dia após dia no aplicativo reconstruiu minha autoconfiança.',
  },
];

export const faqs = [
  {
    question: 'O que é exatamente o Método RESET?',
    answer: 'É um método acompanhado de ferramentas práticas para ajudar pessoas que estão passando por períodos de mudança, desorganização ou perda de direção a identificar prioridades e transformar reflexão em próximos passos.',
  },
  {
    question: 'Como recebo o link para baixar o aplicativo?',
    answer: delivery.instructions,
  },
  {
    question: 'Preciso de login e senha para usar o app?',
    answer: delivery.appUsage,
  },
  {
    question: 'Preciso estar passando por uma situação muito grave para usar?',
    answer: 'Não. O RESET pode ser útil sempre que você sentir que sua vida está desorganizada, que perdeu a direção ou que não sabe qual área deveria priorizar primeiro.',
  },
  {
    question: 'O RESET substitui terapia?',
    answer: 'Não. O RESET é uma ferramenta de organização e reconstrução pessoal. Ele não substitui acompanhamento psicológico, psiquiátrico ou médico quando esse tipo de cuidado é necessário. O botão SOS do app reúne contatos de apoio: CVV pelo 188 ou chat; SAMU pelo 192; Polícia pelo 190.',
  },
  {
    question: 'Quanto tempo preciso dedicar por dia?',
    answer: 'Não existe uma quantidade obrigatória. Algumas ferramentas são usadas em poucos minutos; outras pedem mais tempo de reflexão. A proposta é facilitar o começo, não criar mais uma cobrança.',
  },
  {
    question: 'Preciso fazer tudo de uma vez?',
    answer: 'Não. Essa não é a proposta. Você pode começar pela ferramenta que fizer mais sentido para o seu momento e avançar aos poucos, um passo de cada vez.',
  },
  {
    question: 'O acesso é mensal?',
    answer: `Não. O acesso é feito mediante pagamento único de ${formattedPrice}, conforme as condições atuais da oferta. Sem mensalidade, sem assinatura, sem compromisso de continuar pagando.`,
  },
  {
    question: 'Por quanto tempo terei acesso?',
    answer: 'O acesso é vitalício, conforme as condições apresentadas na oferta.',
  },
  {
    question: 'Recebo o livro também?',
    answer: 'Sim. O Livro RESET em PDF, com 15 capítulos em 4 partes, faz parte da oferta. Ele tem o mesmo conteúdo da leitura no aplicativo, em outro formato para consultar offline ou imprimir.',
  },
  {
    question: 'E se eu falhar em algum dia?',
    answer: 'Uma falha não anula o progresso anterior. O cronograma é organizado por semanas e respeita a sua prontidão: se precisar, repita a fase. O app inclui um Protocolo de Recaída para você nomear o que aconteceu, sem julgamento, e retomar pequeno.',
  },
  {
    question: `Como funciona a garantia de ${official.guaranteeDays} dias?`,
    answer: `Entre, conheça o método e veja se ele faz sentido para você. Se dentro de ${official.guaranteeDays} dias você entender que não é o momento, ou que o RESET não é para você, solicite o reembolso conforme as condições da garantia, sem precisar justificar.`,
  },
];
