import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface InvestmentOption {
  title: string;
  description: string;
  value: number;
}

const InvestScreen = () => {
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);
  const [isInvested, setIsInvested] = useState(false);
  const [customAmount, setCustomAmount] = useState<number>(0);

  const handleInvestment = () => {
    if (investmentAmount > 0) {
      setIsInvested(true);
      console.log(`Investido $${investmentAmount}`);
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
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
          Invista no Seu Futuro
        </h1>

        {isInvested ? (
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
              Insira o valor que deseja investir.
            </p>
            <div className="bg-gray-800 border border-gray-700 shadow-lg rounded-lg">
              <div className="p-4">
                <h2 className="text-lg font-semibold text-white">
                  Valor do Investimento
                </h2>
              </div>
              <div className="p-4">
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(Number(e.target.value))}
                  placeholder="Insira o valor do investimento"
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
