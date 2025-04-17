import React from 'react';

interface Investor {
  id: string;
  name: string;
}

interface PerformanceData {
  month: string;
  value: number;
}

interface InvestmentOption {
  id: string;
  name: string;
  description: string;
  riskLevel: 'Muito Alto' | 'Alto' | 'Médio' | 'Baixo';
  expectedReturn: string;
  currentValue: number;
  initialInvestment: number;
  minInvestment: number;
  maxInvestment: number;
  expirationPeriod: string;
  investors: Investor[];
  performanceHistory: PerformanceData[];
}

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
    investors: Array.from({ length: 25 }, (_, i) => ({ id: `inv-${i}`, name: `Investidor ${i + 1}` })),
    performanceHistory: Array.from({ length: 12 }, (_, i) => ({ month: `M${i + 1}`, value: 10000 + i * 700 })),
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
    investors: Array.from({ length: 50 }, (_, i) => ({ id: `inv-${i}`, name: `Investidor ${i + 1}` })),
    performanceHistory: Array.from({ length: 24 }, (_, i) => ({ month: `M${i + 1}`, value: 10000 + i * 120 })),
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
    investors: Array.from({ length: 100 }, (_, i) => ({ id: `inv-${i}`, name: `Investidor ${i + 1}` })),
    performanceHistory: Array.from({ length: 36 }, (_, i) => ({ month: `M${i + 1}`, value: 10000 + i * 25 })),
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
    investors: Array.from({ length: 15 }, (_, i) => ({ id: `inv-${i}`, name: `Investidor ${i + 1}` })),
    performanceHistory: Array.from({ length: 18 }, (_, i) => ({ month: `M${i + 1}`, value: 10000 + i * 610 })),
  },
  {
    id: 'option-5',
    name: 'Fundo de Investimento Imobiliário (REIT)',
    description: 'Invista em um fundo que possui e opera imóveis que geram renda.',
    riskLevel: 'Médio',
    expectedReturn: '8-12%',
    currentValue: 11500,
    initialInvestment: 5000,
    minInvestment: 5000,
    maxInvestment: 750000,
    expirationPeriod: 'Indeterminado',
    investors: Array.from({ length: 60 }, (_, i) => ({ id: `inv-${i}`, name: `Investidor ${i + 1}` })),
    performanceHistory: Array.from({ length: 24 }, (_, i) => ({ month: `M${i + 1}`, value: 5000 + i * 270 })),
  },
];

const RiskColorMap: Record<InvestmentOption['riskLevel'], string> = {
  'Muito Alto': 'text-red-400',
  'Alto': 'text-orange-400',
  'Médio': 'text-yellow-400',
  'Baixo': 'text-green-400',
};

const InvestmentCard: React.FC<{ option: InvestmentOption }> = ({ option }) => {
  const profit = option.currentValue - option.initialInvestment;
  const percentageGrowth = ((option.currentValue / option.initialInvestment - 1) * 100).toFixed(2);
  const progressPercent = Math.min((option.currentValue / option.maxInvestment) * 100, 100);

  return (
    <div className="rounded-2xl shadow-md p-4 border border-gray-700 bg-gray-800 text-white">
      <h2 className="text-xl font-semibold mb-2">{option.name}</h2>
      <p className="text-sm text-gray-300 mb-2">{option.description}</p>
      <p className="text-sm mb-1">
        <span className="font-medium">Risco:</span>{' '}
        <span className={RiskColorMap[option.riskLevel]}>{option.riskLevel}</span>
      </p>
      <p className="text-sm mb-1">
        <span className="font-medium">Retorno Esperado:</span> {option.expectedReturn}
      </p>
      <p className="text-sm mb-1">
        <span className="font-medium">Investimento Atual:</span> R$ {option.currentValue.toLocaleString()}
      </p>
      <p className="text-sm mb-1">
        <span className="font-medium">Investido Inicialmente:</span> R$ {option.initialInvestment.toLocaleString()}
      </p>
      <p className="text-sm mb-1">
        <span className="font-medium">Lucro:</span> R$ {profit.toLocaleString()} ({percentageGrowth}%)
      </p>
      <p className="text-sm mb-1">
        <span className="font-medium">Período:</span> {option.expirationPeriod}
      </p>
      <div className="w-full bg-gray-700 rounded-full h-2.5 mt-4">
        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${progressPercent}%` }}></div>
      </div>
      <p className="text-xs text-gray-400 mt-1">
        {option.investors.length} investidores
      </p>
    </div>
  );
};

const InvestmentWalletPage: React.FC = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Minha Carteira de Investimentos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockInvestmentOptions.map((option) => (
          <InvestmentCard key={option.id} option={option} />
        ))}
      </div>
    </div>
  );
};

export default InvestmentWalletPage;
