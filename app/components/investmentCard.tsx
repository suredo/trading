import React from 'react';
import { cn } from '~/utils';
import { motion } from 'framer-motion';
import type { InvestmentOption } from '~/routes/home';

interface InvestmentCardProps {
  option: InvestmentOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onInvest: (option: InvestmentOption) => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const getRiskBadgeVariant = (riskLevel: string) => {
  switch (riskLevel) {
    case 'High':
      return 'bg-red-500 text-white';
    case 'Medium':
      return 'bg-yellow-500 text-gray-900';
    case 'Low':
      return 'bg-green-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

const calculateReturn = (currentValue: number, initialInvestment: number) => {
  return ((currentValue - initialInvestment) / initialInvestment) * 100;
};

export const InvestmentCard = ({ option, isSelected, onSelect, onInvest }: InvestmentCardProps) => {
  const calculatedReturn = calculateReturn(option.currentValue, option.initialInvestment);
  const displayReturn = Math.min(calculatedReturn, 100); // Cap at 100%

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full"
    >
      <div
        className={cn(
          "bg-gray-800 border border-gray-700 rounded-lg p-4 transition-all duration-300",
          "hover:shadow-lg hover:border-gray-600 cursor-pointer",
          isSelected && "ring-2 ring-blue-500 ring-offset-2"
        )}
        onClick={() => onSelect(option.id)}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="mb-2 sm:mb-0">
            <h3 className="text-lg font-semibold text-gray-100">{option.name}</h3>
            <p className="text-sm text-gray-400">{option.description}</p>
          </div>
          <span
            className={cn(
              "px-2 py-1 rounded text-xs font-semibold",
              getRiskBadgeVariant(option.riskLevel),
              "bg-opacity-80"
            )}
          >
            {option.riskLevel}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-sm text-gray-400">Retorno Esperado:</p>
            <p className="font-semibold text-gray-200">{option.expectedReturn}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Valor Atual:</p>
            <p className="font-semibold text-gray-200">${option.currentValue.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Invest. Mínimo:</p>
            <p className="font-semibold text-gray-200">${option.minInvestment.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Invest. Máximo:</p>
            <p className="font-semibold text-gray-200">${option.maxInvestment.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Retorno:</p>
            <p
              className={cn(
                "font-semibold",
                calculatedReturn < 0 ? "text-red-500" : "text-green-500"
              )}
            >
              {calculatedReturn.toFixed(2)}%
            </p>
          </div>
          <div className="mt-4 sm:col-span-2">
            <div
              className={cn(
                "h-2 rounded-full",
                calculatedReturn < 0 ? "bg-red-500" : "bg-green-500"
              )}
              style={{ width: `${Math.abs(displayReturn)}%` }} // Use displayReturn here
            />
          </div>
          <div>
            <p className="text-sm text-gray-400">Vencimento:</p>
            <p className="font-semibold text-gray-200">{option.expirationPeriod}</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-400 mb-2">Últimos Investidores:</p>
          <div className="flex items-center">
            {option.investors.slice(0, 3).map((investor, index) => (
              <img
                key={index}
                src={`https://ui-avatars.com/api/?name=${investor.name}&background=random&color=fff`}
                alt={investor.name}
                className="w-8 h-8 rounded-full border-2 border-gray-700 -ml-2 first:ml-0"
              />
            ))}
            {option.investors.length > 3 && (
              <span className="text-xs text-gray-400 ml-2">
                +{option.investors.length - 3} mais
              </span>
            )}
          </div>
        </div>



        <button
          className="mt-6 w-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:text-blue-300 border border-blue-500/30 rounded-md py-2"
          onClick={(e) => {
            e.stopPropagation();
            onInvest(option);
          }}
        >
          Investir Agora
        </button>
      </div>
    </motion.div>
  );
};
