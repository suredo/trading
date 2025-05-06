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

export const InvestmentCard = ({ option, isSelected, onSelect, onInvest }: InvestmentCardProps) => {
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
      >
        <h3 className="text-lg font-semibold text-gray-100 mb-2">{option.name}</h3>

        <div className="flex flex-row sm:flex-row justify-between gap-5 mt-2 flex-wrap">
          <div className="flex flex-col  sm:items-center sm:gap-2">
            <span className="text-sm text-gray-400 mr-1">Retorno:</span>
            <p className="font-semibold text-gray-200">{option.expectedReturn}%</p>
          </div>
          <div className="flex flex-col  sm:items-center sm:gap-2">
            <span className="text-sm text-gray-400 mr-1">Prazo:</span>
            <p className="font-semibold text-gray-200">{`${option.expirationPeriod}`}</p>
          </div>
          <div className="flex flex-col  sm:items-center sm:gap-2">
            <span className="text-sm text-gray-400 mr-1">Mín:</span>
            <p className="font-semibold text-gray-200">${option.minInvestment.toLocaleString()}</p>
          </div>
        </div>

        <button
          className="mt-4 w-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:text-blue-300 border border-blue-500/30 rounded-md py-2"
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
