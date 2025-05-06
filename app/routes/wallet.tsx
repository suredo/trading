import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '~/utils';

// Mock function to generate investors (moved here for reusability)
const generateInvestors = (count: number, seed: number) => {
  const investors = [];
  const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Fiona', 'George', 'Hannah', 'Isaac', 'Judy', 'Kevin', 'Linda'];
  // Use a simple seed for randomization
  const random = (seed: number) => {
    let x = seed;
    x = Math.sin(x) * 10000;
    return x - Math.floor(x);
  };

  for (let i = 0; i < count; i++) {
    // Create a unique seed for each investor
    const investorSeed = seed + i;
    const nameIndex = Math.floor(random(investorSeed) * names.length);
    investors.push({
      name: names[nameIndex] + ' ' + Math.floor(random(investorSeed * 2) * 100), // Add some randomness to the number
    });
  }
  return investors;
};

interface InvestimentoUsuario {
  id: string;
  nomeAtivo: string;
  valorInvestido: number;
  porcentagemRetorno: number;
  dataRetorno: string;
}

const meusInvestimentosMock: InvestimentoUsuario[] = [
  {
    id: 'investimento-1',
    nomeAtivo: 'Bitcoins',
    valorInvestido: 10000,
    porcentagemRetorno: 28.5,
    dataRetorno: '2024-01-15',
  },
  {
    id: 'investimento-2',
    nomeAtivo: 'Fundo Imobiliário XYZ',
    valorInvestido: 5000,
    porcentagemRetorno: 12.2,
    dataRetorno: '2024-03-20',
  },
  {
    id: 'investimento-3',
    nomeAtivo: 'Ações Empresa ABC',
    valorInvestido: 2000,
    porcentagemRetorno: -5.8,
    dataRetorno: '2024-05-01',
  },
];

const chartVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeInOut' } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

const MeusInvestimentos: React.FC = () => {
  const [investimentos, setInvestimentos] = useState<InvestimentoUsuario[]>(meusInvestimentosMock);
  const [selectedInvestment, setSelectedInvestment] = useState<string | null>(null);

  return (
    <div className="p-4 md:p-8 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-100 mb-6">Meus Investimentos</h1>

      <AnimatePresence>
        {investimentos.map((investimento) => {
          const isInvestmentSelected = selectedInvestment === investimento.id;
          return (
            <React.Fragment key={investimento.id}>
              <motion.div
                key={investimento.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-6 w-full"
              >
                <div
                  className={cn(
                    "bg-gray-800 border border-gray-700 rounded-lg transition-all duration-300",
                    "hover:shadow-lg hover:border-gray-600 cursor-pointer",
                    isInvestmentSelected && "ring-2 ring-blue-500 ring-offset-2"
                  )}
                  onClick={() => setSelectedInvestment(investimento.id)}

                >
                  <div className="p-4 border-b border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-100">{investimento.nomeAtivo}</h2>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Valor Investido:</p>
                        <p className="font-semibold text-gray-200">
                          {investimento.valorInvestido.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Retorno:</p>
                        <p
                          className={cn(
                            "font-semibold",
                            investimento.porcentagemRetorno < 0
                              ? "text-red-500"
                              : "text-green-500"
                          )}
                        >
                          {investimento.porcentagemRetorno.toFixed(2)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Data Retorno:</p>
                        <p className="font-semibold text-gray-200">{investimento.dataRetorno}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              {/* {isInvestmentSelected &&  Removed this whole section
                                renderPerformanceChart(
                                    investimento.historicoPerformance,
                                    `Histórico de Performance de ${investimento.nomeAtivo}`
                                )}
                            */}
            </React.Fragment>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default MeusInvestimentos;

