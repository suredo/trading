import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ChevronRight, Wallet } from 'lucide-react';

interface InvestmentOption {
  title: string;
  description: string;
  value: number;
}

const investmentOptions: InvestmentOption[] = [
  { title: 'Opção 1', description: 'Investimento de Exemplo 1', value: 100 },
  { title: 'Opção 2', description: 'Investimento de Exemplo 2', value: 500 },
  { title: 'Opção 3', description: 'Investimento de Exemplo 3', value: 1000 },
  { title: 'Opção 4', description: 'Investimento de Exemplo 4', value: 2000 },
  { title: 'Opção 5', description: 'Investimento de Exemplo 5', value: 5000 },
];

const InvestScreen = () => {
  const [selectedOption, setSelectedOption] = useState<InvestmentOption | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);
  const [isInvested, setIsInvested] = useState(false);
  const [customAmount, setCustomAmount] = useState<number>(0);

  const handleOptionSelect = (option: InvestmentOption) => {
    setCustomAmount(option.value);
    setInvestmentAmount(option.value);
  };

  const handleInvestment = () => {
    if (investmentAmount > 0) {
      setIsInvested(true);
      console.log(`Investido $${investmentAmount}`);
      // You would typically send the investment data to your server here
      // and handle success/failure.  For this example, we just set a state.
    }
  };

  const handleCustomAmountChange = (value: number) => {
    setCustomAmount(value);
    setInvestmentAmount(value);
  };

  const resetInvestment = () => {
    setIsInvested(false);
    setInvestmentAmount(0);
    setCustomAmount(0);
    setSelectedOption(null); // Also reset selected option
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
          Invista no Seu Futuro
        </h1>

        {isInvested ? ( // Show confirmation message
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4 text-green-500" />
            <p className="text-xl font-semibold text-green-400 mb-4">
              Investimento Realizado com Sucesso!
            </p>
            <p className="text-gray-300 mb-6">
              Você investiu ${investmentAmount}.
            </p>
            <button
              onClick={resetInvestment}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full"
            >
              Voltar
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-400">
              Selecione uma opção abaixo ou insira um valor personalizado.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {investmentOptions.map((option) => (
                <motion.div
                  key={option.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * investmentOptions.indexOf(option) }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className="bg-gray-800 border border-gray-700 shadow-lg cursor-pointer transition-all duration-300 hover:border-purple-500 hover:shadow-purple-500/20 rounded-lg"
                    onClick={() => handleOptionSelect(option)}
                  >
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Wallet className="w-5 h-5" />
                        {option.title}
                      </h3>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-300">
                        {option.description}
                      </p>
                      <div className="text-2xl font-bold text-white mt-4">
                        ${option.value}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="bg-gray-800 border border-gray-700 shadow-lg rounded-lg">
              <div className="p-4">
                <h2 className="text-lg font-semibold text-white">
                  Valor Personalizado
                </h2>
              </div>
              <div className="p-4">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-200 mb-2">
                  Valor do Investimento
                </label>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(Number(e.target.value))}
                  placeholder="Insira o valor personalizado"
                  className="bg-gray-700 border border-gray-600 text-white w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min={0}
                  id="amount"
                />
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={handleInvestment}
                className="bg-gradient-to-r text-white font-semibold px-6 py-3 rounded-full w-full transition-all duration-300 shadow-lg from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={customAmount <= 0}
              >
                Confirmar Investimento
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestScreen;
