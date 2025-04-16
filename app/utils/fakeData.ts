import type { InvestmentOption } from "~/routes/home";


const generateMockPerformanceHistory = (months: number, initialValue: number) => {
  let value = initialValue;
  const history = [];
  const startDate = new Date(new Date().setMonth(new Date().getMonth() - months));

  for (let i = 0; i < months; i++) {
    const date = new Date(startDate.setMonth(startDate.getMonth() + 1)).toISOString().slice(0, 7);
    // Simulate some fluctuation
    const fluctuation = Math.random() * (value * 0.1); // +/- 10%
    const direction = Math.random() > 0.3 ? 1 : -1; // Favor growth slightly
    value += fluctuation * direction;
    history.push({ date, value: Math.max(0, value) }); // Ensure value doesn't go negative
  }
  return history;
};

const generateInvestors = (count: number) => {
  const investors = [];
  const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Fiona', 'George', 'Hannah'];
  for (let i = 0; i < count; i++) {
    investors.push({
      name: names[Math.floor(Math.random() * names.length)] + ' ' + (i + 1),
      investedAmount: Math.floor(Math.random() * 5000) + 1000, // Between 1000 and 6000
    });
  }
  return investors;
};

const mockInvestmentOptions: InvestmentOption[] = [
  {
    id: 'option-1',
    name: 'Portfólio de Crescimento Tecnológico',
    description: 'Invista em empresas de tecnologia de alto crescimento com potencial de valorização significativo.',
    riskLevel: 'Alto',
    expectedReturn: '25-35%',
    currentValue: 18500,
    initialInvestment: 10000,
    minInvestment: 5000,
    maxInvestment: 500000,
    expirationPeriod: '5 anos',
    investors: generateInvestors(25),
    performanceHistory: generateMockPerformanceHistory(12, 10000),
  },
  {
    id: 'option-2',
    name: 'Fundo de Índice de Mercado Balanceado',
    description: 'Portfólio diversificado que acompanha os principais índices de mercado para um crescimento constante.',
    riskLevel: 'Médio',
    expectedReturn: '10-15%',
    currentValue: 12800,
    initialInvestment: 10000,
    minInvestment: 1000,
    maxInvestment: 1000000,
    expirationPeriod: '10 anos',
    investors: generateInvestors(50),
    performanceHistory: generateMockPerformanceHistory(24, 10000),
  },
  {
    id: 'option-3',
    name: 'Portfólio de Títulos Conservador',
    description: 'Investimento de baixo risco em títulos públicos e corporativos para renda estável.',
    riskLevel: 'Baixo',
    expectedReturn: '4-6%',
    currentValue: 10900,
    initialInvestment: 10000,
    minInvestment: 100,
    maxInvestment: 2000000,
    expirationPeriod: '3 anos',
    investors: generateInvestors(100),
    performanceHistory: generateMockPerformanceHistory(36, 10000),
  },
  {
    id: 'option-4',
    name: 'Fundo de Mercados Emergentes',
    description: 'Invista em empresas de economias em desenvolvimento, oferecendo alto potencial de crescimento com risco adicional.',
    riskLevel: 'Muito Alto',
    expectedReturn: '30-40%',
    currentValue: 21000,
    initialInvestment: 10000,
    minInvestment: 10000,
    maxInvestment: 300000,
    expirationPeriod: '7 anos',
    investors: generateInvestors(15),
    performanceHistory: generateMockPerformanceHistory(18, 10000),
  },
  {
    id: 'option-5',
    name: 'Fundo de Investimento Imobiliário (REIT)',
    description: 'Invista em um fundo que possui e opera imóveis que geram renda.',
    riskLevel: 'Médio',
    expectedReturn: '8-12%',
    currentValue: 11500,
    initialInvestment: 5000,
    maxInvestment: 750000,
    minInvestment: 5000,
    expirationPeriod: 'Indeterminado',
    investors: generateInvestors(60),
    performanceHistory: generateMockPerformanceHistory(24, 10000),
  },
];


export default mockInvestmentOptions;
